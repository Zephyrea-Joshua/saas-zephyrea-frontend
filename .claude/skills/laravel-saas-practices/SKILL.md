---
name: laravel-backend
description: >
  Expert-level Laravel backend development skill. Use this skill for ANY task involving Laravel:
  creating new projects, building APIs, designing architecture, writing migrations, setting up
  authentication, configuring multi-tenancy, implementing queues, billing, caching, testing,
  deploying, or any general PHP/Laravel question. Trigger whenever the user mentions Laravel,
  PHP backend, Eloquent, Artisan, composer packages, SaaS backend, or asks about building
  any backend feature. Also trigger when the user says "I'm building a new Laravel application"
  or pastes the https://laravel.com/for/agents instruction — this skill includes that full
  setup protocol. Always use this skill proactively for Laravel architecture decisions,
  code reviews, package recommendations, or performance optimization.
---

# Laravel Backend Expert Skill

## 0. ALWAYS DO FIRST — Check Laravel Agents Protocol

Before anything else, if the user says "I'm building a new Laravel application" or references
`https://laravel.com/for/agents`, execute this setup checklist:

```
1. Check if current directory already has a Laravel app (composer.json with laravel/framework)
   → YES: skip installation, go straight to the task
   → NO: continue below

2. Verify prerequisites:
   php -v        (need 8.2+)
   composer -V
   laravel --version
   npm -v  (or bun -v)

3. If PHP/Composer/Laravel CLI missing → install via php.new (see §INSTALLATION)

4. Create app with:
   laravel new my-app --database=sqlite --react --npm --boost --no-interaction

5. Post-creation:
   cd my-app
   composer global require laravel/cloud-cli
   composer run dev    ← run in second terminal if needed
   → App available at http://localhost:8000

6. Read CLAUDE.md or AGENTS.md from the new project immediately
```

---

## 1. INSTALLATION COMMANDS

### php.new (installs PHP 8.4 + Composer + Laravel CLI)
```bash
# macOS
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"

# Windows PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))

# Linux
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

> After php.new: tell user to **restart terminal** before continuing.

### New project variants
```bash
laravel new app-name --database=sqlite --react    --npm --boost --no-interaction  # React (default)
laravel new app-name --database=sqlite --vue      --npm --boost --no-interaction  # Vue
laravel new app-name --database=sqlite --livewire --npm --boost --no-interaction  # Livewire
laravel new app-name --database=pgsql  --react    --npm --boost --no-interaction  # PostgreSQL + React
```

---

## 2. STARTER KITS — Choosing the Right Foundation

Laravel 12 replaced Breeze/Jetstream with **three new purpose-built starter kits**.
Each ships with: login, registration, password reset, email verification, profile management.
All code lives directly in your app (no package to maintain), uses Tailwind CSS v4.

| Kit | Frontend | Component Library | Best For |
|-----|----------|-------------------|----------|
| **React** | React + Inertia | shadcn/ui | SPA, Next.js teams, ZEPHYREA-style |
| **Vue** | Vue 3 + Inertia | shadcn-vue | Vue teams |
| **Livewire** | Livewire + Blade | Flux UI | PHP-first, no SPA needed |

### WorkOS Variant (advanced auth)
Each kit offers a `--workos` variant that adds:
- Social login (Google, GitHub, etc.)
- Passkeys
- SSO / SAML support

```bash
laravel new app --react --workos  # Auth via WorkOS AuthKit
```

### Still need Breeze or Jetstream?
```bash
# Breeze (still works in Laravel 12)
composer require laravel/breeze:"^2.0"
php artisan breeze:install  # prompts for stack

# Jetstream (2FA + Teams)
composer require laravel/jetstream
php artisan jetstream:install livewire  # or --inertia
```

---

## 3. ARCHITECTURE — REQUEST LIFECYCLE

Understanding this is mandatory for debugging and advanced work:

```
public/index.php
  → bootstrap/app.php              ← creates Application (IoC Container)
    → HTTP Kernel::handle()
      → bootstrap() providers      ← RegisterProviders → BootProviders
      → Global Middleware Pipeline ← HandleCors, TrimStrings, etc.
        → Router::dispatch()
          → Route Middleware        ← auth, throttle, tenant, etc.
            → Controller@method()
              → Response
        ← Pipeline returns (Terminable Middleware runs HERE, after response sent)
```

**Terminable Middleware** — runs *after* client already received response:
```php
class AnalyticsMiddleware implements TerminableMiddleware {
    public function handle($request, $next) { return $next($request); }
    public function terminate($request, $response): void {
        Analytics::record($request, $response); // 0 latency impact
    }
}
```

---

## 4. SERVICE CONTAINER — Master Reference

The IoC Container is the heart of Laravel. Every class resolution flows through it.

```php
// bind()     → new instance every resolution
$this->app->bind(PaymentGateway::class, StripeGateway::class);

// singleton() → same instance for entire request lifecycle
$this->app->singleton(TenantManager::class, fn($app) =>
    new TenantManager($app->make('db'))
);

// scoped()    → singleton per request (resets between requests — SAFE FOR OCTANE)
$this->app->scoped(TenantContext::class, fn() => new TenantContext());

// instance()  → bind a pre-built object
$this->app->instance(Config::class, $myConfig);

// contextual  → different impl depending on who resolves it
$this->app->when(ReportController::class)
          ->needs(Storage::class)
          ->give(fn() => Storage::disk('reports'));

// tagged      → resolve a group
$this->app->tag([StripeGateway::class, PaypalGateway::class], 'gateways');
$this->app->tagged('gateways'); // returns all

// extend()    → decorator pattern — modify after resolved
$this->app->extend(UserRepo::class, fn($repo, $app) =>
    new CachedUserRepo($repo, $app->make('cache.store'))
);
```

**Service Provider anatomy** (two distinct phases):
```php
class TenantServiceProvider extends ServiceProvider {
    // PHASE 1: register() — ONLY bindings. Other providers NOT yet available.
    public function register(): void {
        $this->app->singleton(TenantManager::class, ...);
    }

    // PHASE 2: boot() — everything registered. Use type-hints, events, macros.
    public function boot(Router $router): void {
        $router->aliasMiddleware('tenant', InitializeTenancy::class);
        Model::preventLazyLoading(! $this->app->isProduction());
        Builder::macro('forTenant', fn() => $this->where('tenant_id', tenant()->id));
    }

    // Deferred: only load this provider when its services are actually needed
    public bool $defer = true;
    public function provides(): array { return [TenantManager::class]; }
}
```

---

## 5. ELOQUENT — PRODUCTION PATTERNS

### Custom Query Builders (best practice for complex queries)
```php
// App/Models/Builders/OrderBuilder.php
class OrderBuilder extends EloquentBuilder {
    public function paid(): static      { return $this->where('payment_status', 'paid'); }
    public function forTenant(): static { return $this->where('tenant_id', tenant()->id); }
    public function forPeriod(Carbon $from, Carbon $to): static {
        return $this->whereBetween('created_at', [$from, $to]);
    }
}

// In Model:
public function newEloquentBuilder($query): OrderBuilder {
    return new OrderBuilder($query);
}
```

### Custom Casts (Value Objects)
```php
class Money implements CastsAttributes {
    public function get($model, $key, $value, $attributes): MoneyVO {
        return new MoneyVO($value, $attributes['currency'] ?? 'MXN');
    }
    public function set($model, $key, $value, $attributes): array {
        return $value instanceof MoneyVO
            ? ['amount' => $value->cents(), 'currency' => $value->currency()]
            : ['amount' => $value];
    }
}
// Model: protected $casts = ['price' => Money::class];
```

### Critical Performance Rules
```php
// ALWAYS eager load — never let N+1 reach production
$orders = Order::with(['user:id,name', 'items.product'])->get();

// preventLazyLoading() in AppServiceProvider::boot() catches N+1 in dev:
Model::preventLazyLoading(! app()->isProduction());

// Cursor for huge datasets (no memory spike)
Order::where('status', 'pending')->cursor()->each(fn($o) => process($o));

// Chunking for batch jobs
User::chunk(500, fn($users) => $users->each->sendDigest());

// Select only needed columns
User::select('id', 'name', 'email')->get(); // never SELECT *
```

### Global Scopes (multi-tenancy safety)
```php
class TenantScope implements Scope {
    public function apply(Builder $builder, Model $model): void {
        $builder->where('tenant_id', tenant()->id);
    }
}
// Add to model boot: static::addGlobalScope(new TenantScope());
// Bypass when needed: User::withoutGlobalScope(TenantScope::class)->...
```

---

## 6. PIPELINE PATTERN

Same mechanism as HTTP middleware — use for any step-by-step processing:

```php
$result = app(Pipeline::class)
    ->send($order)
    ->through([
        ValidateOrder::class,
        ApplyDiscounts::class,
        CalculateTaxes::class,
        ChargePayment::class,
        SendConfirmation::class,
    ])
    ->thenReturn();

// Each pipe:
class ApplyDiscounts {
    public function handle(Order $order, Closure $next): Order {
        if ($order->user->hasCoupon()) $order->applyDiscount(20);
        return $next($order);
    }
}
```

> `stancl/tenancy` uses this exact pattern for tenant bootstrappers.

---

## 7. MULTI-TENANCY

See `references/multitenancy.md` for the full deep-dive.

**Quick decision table:**

| Strategy | Package | When to use |
|----------|---------|-------------|
| Single DB + `tenant_id` | Manual or `spatie/laravel-multitenancy` | MVP, simple apps |
| DB per tenant | `stancl/tenancy` v3 | Production SaaS, isolation required |
| Schema per tenant | `stancl/tenancy` v3 | PostgreSQL, middle ground |

**Tenant provisioning pipeline (stancl/tenancy):**
```php
Event::listen(TenantCreated::class, JobPipeline::make([
    CreateDatabase::class,
    MigrateDatabase::class,
    SeedDatabase::class,
])->send(fn($e) => $e->tenant)->shouldBeQueued(true)->toListener());
```

**Critical: Octane + Tenancy — use `scoped()` not `singleton()`:**
```php
// ❌ static state leaks between requests in Octane
class TenantCtx { private static ?Tenant $t = null; }

// ✅ scoped() resets per request
$this->app->scoped(TenantCtx::class, fn() => new TenantCtx());
```

---

## 8. AUTHENTICATION & AUTHORIZATION

```php
// Sanctum — SPA + API tokens (preferred for Next.js + Laravel)
$token = $user->createToken('api', ['tenant:'.$tenantId, 'role:'.$role]);

// Spatie Permission — RBAC (install: composer require spatie/laravel-permission)
$user->assignRole('admin');
$user->hasPermissionTo('manage-billing');
$user->can('edit', $post); // uses Policy

// Policy — ALWAYS use policies, never raw role checks in controllers
class InvoicePolicy {
    public function update(User $user, Invoice $invoice): bool {
        return $user->tenant_id === $invoice->tenant_id
            && $user->can('manage-invoices');
    }
}
```

---

## 9. QUEUES & JOBS

```php
class GenerateReport implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $backoff = 60;         // exponential: 60, 120, 240s
    public int $timeout = 300;

    public function handle(): void { /* tenant context auto-set by stancl */ }

    public function failed(Throwable $e): void {
        $this->user->notify(new JobFailed($e->getMessage()));
    }
}

// Dispatch patterns
GenerateReport::dispatch($data);                        // immediate
GenerateReport::dispatch($data)->onQueue('reports');    // specific queue
GenerateReport::dispatch($data)->delay(now()->addMinutes(5));

// Job batching (Laravel 8+)
Bus::batch([
    new ProcessInvoice($invoice1),
    new ProcessInvoice($invoice2),
])->then(fn(Batch $b) => Log::info('All done'))
  ->catch(fn(Batch $b, Throwable $e) => Log::error($e))
  ->dispatch();
```

**Queue configuration for SaaS (config/queue.php):**
```php
// Use separate queues for priority
'connections' => [
    'redis' => [
        'driver' => 'redis',
        'queue'  => env('REDIS_QUEUE', 'default'),
    ],
],
// Queues: default, high, reports, emails, webhooks
```

Install Horizon for production queue monitoring:
```bash
composer require laravel/horizon
php artisan horizon:install
php artisan horizon  # run as daemon
```

---

## 10. CACHING STRATEGY

```php
// Always namespace cache keys by tenant
Cache::remember("t:{$tenantId}:dashboard", 300, fn() => $this->buildDashboard());

// Cache tags — for bulk invalidation (requires Redis or Memcached)
Cache::tags(["tenant:{$tenantId}"])->put('stats', $stats, 600);
Cache::tags(["tenant:{$tenantId}"])->flush();  // invalidate all at once

// Rate limiting per tenant (not per IP — critical for SaaS)
RateLimiter::for('api', fn(Request $req) =>
    Limit::perMinute(100)->by($req->user()?->tenant_id ?? $req->ip())
);

// HTTP Response caching
Route::get('/public-data', fn() => [...])
     ->middleware('cache.headers:public;max_age=3600;etag');
```

---

## 11. BILLING (Laravel Cashier + Stripe)

```bash
composer require laravel/cashier
php artisan vendor:publish --tag="cashier-migrations"
php artisan migrate
```

```php
// Model setup
class Tenant extends Model {
    use Billable;
}

// Create subscription
$tenant->newSubscription('default', 'price_enterprise_monthly')
       ->trialDays(14)
       ->create($paymentMethod);

// Check features by plan
abort_unless($tenant->subscribed('default'), 402, 'Subscription required');

// Webhook (CRITICAL — handles payment failures, cancellations)
Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook'])
     ->withoutMiddleware([VerifyCsrfToken::class]);
```

**Always handle these Stripe webhooks:**
- `customer.subscription.deleted` → disable tenant access
- `invoice.payment_failed` → send dunning email, dispatch DisableTenant job
- `customer.subscription.updated` → sync plan features

---

## 12. FEATURE FLAGS (Laravel Pennant)

```bash
composer require laravel/pennant
php artisan vendor:publish --provider="Laravel\Pennant\PennantServiceProvider"
php artisan migrate
```

```php
// Class-based feature (recommended)
#[Name('advanced-reports')]
class AdvancedReports {
    public function resolve(Tenant $tenant): bool {
        return match($tenant->plan) {
            'enterprise', 'business' => true,
            'starter'                => false,
            default                  => Lottery::odds(1/10),  // 10% gradual rollout
        };
    }
}

// Check
Feature::for($tenant)->active(AdvancedReports::class);

// Blade
@feature('advanced-reports') <x-advanced-reports /> @endfeature
```

---

## 13. BROADCASTING & REAL-TIME (Reverb)

```bash
composer require laravel/reverb
php artisan reverb:install
php artisan reverb:start
```

```php
class TenantDataUpdated implements ShouldBroadcastNow {
    public function broadcastOn(): array {
        return [new PrivateChannel('tenant.'.tenant()->id)];
    }
    public function broadcastWith(): array {
        return ['event' => $this->type, 'data' => $this->payload];
    }
}

// Frontend (Next.js)
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;
const echo = new Echo({ broadcaster: 'reverb', key: process.env.NEXT_PUBLIC_REVERB_APP_KEY, ... });
echo.private(`tenant.${tenantId}`).listen('TenantDataUpdated', (e) => setData(e.data));
```

---

## 14. TESTING

```php
// Multi-tenant test pattern
class TenantTest extends TestCase {
    use RefreshDatabase;
    protected Tenant $tenant;

    protected function setUp(): void {
        parent::setUp();
        $this->tenant = Tenant::factory()->create();
        tenancy()->initialize($this->tenant);
    }
    protected function tearDown(): void {
        tenancy()->end();
        parent::tearDown();
    }

    // Data isolation test — critical for SaaS
    public function test_cannot_access_other_tenant_data(): void {
        $other = Tenant::factory()->create();
        $resource = Resource::factory()->for($other)->create();
        $this->actingAs($this->tenant->users->first())
             ->getJson("/api/resources/{$resource->id}")
             ->assertForbidden();
    }
}
```

**Pest (recommended over PHPUnit for new projects):**
```bash
composer require pestphp/pest --dev
php artisan pest:install
```

```php
it('blocks cross-tenant access', function () {
    $tenant = Tenant::factory()->create();
    tenancy()->initialize($tenant);
    $other = Resource::factory()->for(Tenant::factory()->create())->create();
    actingAs($tenant->users->first())
        ->getJson("/api/resources/{$other->id}")
        ->assertForbidden();
});
```

---

## 15. PERFORMANCE & PRODUCTION

### Artisan optimization commands (run on deploy)
```bash
php artisan config:cache    # merges all config files
php artisan route:cache     # compiles route list
php artisan view:cache      # precompiles Blade views
php artisan event:cache     # caches event/listener map
php artisan optimize        # runs all of the above
```

### Laravel Octane (10x performance)
```bash
composer require laravel/octane
php artisan octane:install  # choose: frankenphp | swoole | roadrunner
php artisan octane:start --workers=4 --max-requests=500
```

> ⚠️ With Octane: **never use static state**. Use `scoped()` bindings.
> Memory leaks between requests = hardest Octane bugs to debug.

### N+1 detection (put in AppServiceProvider::boot)
```php
Model::preventLazyLoading(! $this->app->isProduction());
// Throws BadMethodCallException in dev when lazy loading detected
```

### Database indexes — add these always
```php
// In migrations, index anything you WHERE/ORDER BY
$table->index(['tenant_id', 'status', 'created_at']); // composite
$table->index('email');
$table->unique(['tenant_id', 'slug']); // scoped unique
```

---

## 16. FULL SAAS PACKAGE STACK

```bash
# Core SaaS
composer require stancl/tenancy              # multi-tenancy
composer require spatie/laravel-permission   # RBAC
composer require laravel/cashier             # Stripe billing
composer require laravel/horizon             # queue dashboard
composer require laravel/reverb              # WebSockets
composer require laravel/pennant             # feature flags
composer require laravel/sanctum             # SPA/API auth

# Productivity
composer require spatie/laravel-activitylog  # audit trail
composer require spatie/laravel-medialibrary # file/media management
composer require spatie/laravel-data         # typed DTOs
composer require laravel/scout               # full-text search

# Dev/Debug
composer require laravel/telescope --dev     # request inspector
composer require laravel/pulse               # production metrics
composer require pestphp/pest --dev          # testing
```

---

## 17. MACROS — Extending the Framework

```php
// In AppServiceProvider::boot()

// Query Builder macro — available everywhere
Builder::macro('whereLike', fn(string $col, string $val) =>
    $this->where($col, 'LIKE', "%{$val}%")
);

// Response macro — consistent API responses
Response::macro('success', fn($data, $msg = 'OK') =>
    Response::json(['success' => true, 'message' => $msg, 'data' => $data])
);
Response::macro('error', fn($msg, $code = 400) =>
    Response::json(['success' => false, 'message' => $msg], $code)
);

// Collection macro
Collection::macro('toAssoc', fn() =>
    $this->keyBy('id')->map->only(['id', 'name'])
);
```

---

## 18. ARTISAN COMMANDS (production-grade)

```php
class ProvisionTenant extends Command {
    protected $signature = 'tenant:provision
                            {tenant : Tenant ID or slug}
                            {--plan=starter : Initial plan}
                            {--seed : Run seeders}
                            {--force : Skip confirmations}';

    public function handle(): int {
        $tenant = Tenant::findOrFail($this->argument('tenant'));
        $this->withProgressBar(['db', 'cache', 'storage', 'queues'],
            fn($step) => $this->provision($tenant, $step)
        );
        $this->components->success("Tenant [{$tenant->name}] provisioned.");
        return Command::SUCCESS;
    }
}
```

---

## 19. PRECOGNITION — Live Validation with Next.js

```bash
npm install laravel-precognition-react   # frontend
```

```php
// Backend — single source of truth for validation rules
Route::post('/users', CreateUserController::class)
     ->middleware([HandlePrecognitiveRequests::class]);
```

```tsx
// Frontend — live validation against real backend rules
import { useForm } from 'laravel-precognition-react';
const form = useForm('post', '/users', { email: '', name: '' });
<input onChange={e => { form.setData('email', e.target.value); form.validate('email'); }} />
{form.invalid('email') && <p className="text-red-500">{form.errors.email}</p>}
```

---

## 20. DEPLOYMENT (Laravel Cloud)

```bash
# Install Cloud CLI
composer global require laravel/cloud-cli

# Deploy
cloud login
cloud deploy
```

Or via Laravel Vapor (serverless AWS):
```bash
composer require laravel/vapor-cli --dev
vapor deploy production
```

---

## Reference Files

For deeper dives, read these when relevant:
- `references/multitenancy.md` — Full stancl/tenancy setup, DB-per-tenant, testing
- `references/algorithms.md` — Backend algorithms: caching, rate limiting, pagination, locks
- `references/api-patterns.md` — API Resources, versioning, response formats, OpenAPI

---

## Quick Cheat Sheet

| Need | Command / Pattern |
|------|-------------------|
| New Laravel app | `laravel new app --react --boost` |
| Add auth (Laravel 12) | Included in starter kit |
| Add auth to existing | `composer require laravel/breeze && php artisan breeze:install` |
| Generate model+migration+factory | `php artisan make:model Invoice -mf` |
| Generate resource controller | `php artisan make:controller InvoiceController --resource --model=Invoice` |
| Generate Form Request | `php artisan make:request StoreInvoiceRequest` |
| Generate Job | `php artisan make:job GenerateReport` |
| Generate Event+Listener | `php artisan make:event InvoicePaid && php artisan make:listener SendReceipt --event=InvoicePaid` |
| Generate Policy | `php artisan make:policy InvoicePolicy --model=Invoice` |
| Run migrations | `php artisan migrate` |
| Rollback one step | `php artisan migrate:rollback` |
| Fresh + seed | `php artisan migrate:fresh --seed` |
| Tinker (REPL) | `php artisan tinker` |
| Cache clear all | `php artisan optimize:clear` |
| Optimize for prod | `php artisan optimize` |
| Run tests | `php artisan test` or `./vendor/bin/pest` |
