# Multi-Tenancy Deep Reference

## Strategies Comparison

| | Single DB | DB per Tenant | Schema per Tenant |
|---|---|---|---|
| Package | `spatie/laravel-multitenancy` or manual | `stancl/tenancy` v3 | `stancl/tenancy` v3 |
| Data isolation | Medium (Global Scope) | High | High |
| DB connections | 1 | 1 per tenant | 1 |
| Migration complexity | Low | Medium | Medium |
| Performance isolation | Low | High | Medium |
| Best for | MVP, simple apps | Production SaaS | PostgreSQL SaaS |

---

## stancl/tenancy v3 — Full Setup

```bash
composer require stancl/tenancy
php artisan tenancy:install
php artisan migrate
```

### Tenant model
```php
class Tenant extends BaseTenant implements TenantWithDatabase {
    use HasDatabase, HasDomains;

    protected $fillable = ['id', 'name', 'plan', 'trial_ends_at'];
    protected $casts    = ['trial_ends_at' => 'datetime'];

    // Called when this tenant becomes current
    public static function getCustomColumns(): array {
        return ['id', 'name', 'plan', 'trial_ends_at'];
    }
}
```

### TenancyServiceProvider bootstrappers
```php
public function bootstrappers(): array {
    return [
        InitializeTenancyByDomain::class,        // or BySubdomain, ByPath
        SwitchTenantDatabase::class,
        PrefixCacheKeys::class,
        MakeQueuesTenantAware::class,
        SwitchTenantStorage::class,
    ];
}
```

### Tenant provisioning pipeline
```php
// EventServiceProvider
use Stancl\JobPipeline\JobPipeline;
use Stancl\Tenancy\Events\TenantCreated;
use Stancl\Tenancy\Jobs\{CreateDatabase, MigrateDatabase, SeedDatabase};

Event::listen(TenantCreated::class,
    JobPipeline::make([
        CreateDatabase::class,
        MigrateDatabase::class,
        SeedDatabase::class,
    ])
    ->send(fn(TenantCreated $event) => $event->tenant)
    ->shouldBeQueued(true)
    ->toListener()
);
```

### Routes separation
```php
// routes/tenant.php — these routes run inside tenant context
Route::middleware(['tenant', 'auth:sanctum'])->group(function () {
    Route::apiResource('invoices', InvoiceController::class);
    Route::apiResource('users', TenantUserController::class);
});

// routes/central.php — landlord routes (registration, billing, etc.)
Route::middleware(['web'])->group(function () {
    Route::post('/register-tenant', RegisterTenantController::class);
    Route::post('/stripe/webhook', StripeWebhookController::class);
});
```

### Tenant-aware Jobs (automatic with stancl)
```php
class GenerateInvoice implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // stancl automatically tags this job with the current tenant
    // and re-initializes tenant context on the worker side
    public function handle(): void {
        // tenant() is available here — DB connection already switched
        Invoice::create([...]);
    }
}
```

### Scheduled Jobs for ALL tenants
```php
// app/Console/Kernel.php — runs a job for every tenant
protected function schedule(Schedule $schedule): void {
    $schedule->call(function () {
        Tenant::all()->each(function (Tenant $tenant) {
            tenancy()->initialize($tenant);
            dispatch(new SendWeeklyReport($tenant));
            tenancy()->end();
        });
    })->weekly();
}
```

### Testing with tenants
```php
class TenantFeatureTest extends TestCase {
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

    public function test_data_isolation(): void {
        // Create data in tenant A
        $resource = Resource::factory()->create(); // belongs to $this->tenant

        // Switch to tenant B
        $tenantB = Tenant::factory()->create();
        tenancy()->initialize($tenantB);

        // Tenant B should not see tenant A's data
        $this->assertEmpty(Resource::all());

        tenancy()->initialize($this->tenant);
    }
}
```

---

## Spatie Multitenancy — Single DB Setup

```bash
composer require spatie/laravel-multitenancy
php artisan vendor:publish --provider="Spatie\Multitenancy\MultitenancyServiceProvider"
```

```php
// config/multitenancy.php
return [
    'tenant_finder'                    => DomainTenantFinder::class,
    'queues_are_tenant_aware_by_default' => true,
    'switch_tenant_tasks'              => [
        SwitchTenantDatabase::class,    // use for DB-per-tenant
        // OR skip this and use Global Scopes for single-DB
    ],
];

// Tenant model
class Tenant extends BaseTenant {
    protected $fillable = ['name', 'domain', 'database', 'plan'];
}
```

---

## Critical Pitfalls

1. **Forgetting Global Scope** — in single-DB, one missing scope = data leak
2. **Static state in Octane** — use `scoped()` binding, never `private static`
3. **Cross-tenant file storage** — always namespace storage paths by tenant
4. **Queue worker tenant context** — test that background jobs run in correct tenant DB
5. **Migration separation** — central migrations (tenants table) vs tenant migrations (user data)
