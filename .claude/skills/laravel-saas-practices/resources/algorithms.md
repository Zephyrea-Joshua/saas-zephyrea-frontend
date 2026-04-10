# Backend Algorithms Reference

## Complexity Cheat Sheet
O(1) → Hash lookup, array access by index
O(log n) → Binary search, B-Tree index lookup
O(n) → Linear scan, Collection::filter()
O(n log n) → Sorting (QuickSort, MergeSort, PHP sort())
O(n²) → Nested loops — AVOID in production

---

## 1. RATE LIMITING — Algorithms

### Token Bucket (Laravel built-in default)
- Bucket fills at fixed rate
- Request consumes a token
- Burst allowed (bucket fills up)
```php
RateLimiter::for('api', fn($req) =>
    Limit::perMinute(60)->by($req->user()->tenant_id)
);
// Multiple limits: array of Limit objects
RateLimiter::for('api', fn($req) => [
    Limit::perMinute(60)->by($req->user()->tenant_id),
    Limit::perDay(1000)->by($req->user()->tenant_id),
]);
```

### Sliding Window (Redis implementation)
```php
// More accurate than fixed window — no burst at window edge
public function slidingWindow(string $key, int $limit, int $window): bool {
    $now    = microtime(true) * 1000;
    $cutoff = $now - ($window * 1000);

    Redis::pipeline(function ($pipe) use ($key, $now, $cutoff) {
        $pipe->zremrangebyscore($key, 0, $cutoff);
        $pipe->zadd($key, $now, $now);
        $pipe->expire($key, $window + 1);
    });

    return Redis::zcard($key) <= $limit;
}
```

---

## 2. CACHING — LRU in Practice

Laravel/Redis handles LRU eviction automatically with `maxmemory-policy allkeys-lru`.
Your job is proper key design and TTLs:

```php
// Short TTL for volatile data
Cache::remember("t:{$tid}:dashboard", 60, ...);       // 1 min

// Long TTL for stable data
Cache::remember("t:{$tid}:plan:features", 3600, ...); // 1 hour

// Permanent until invalidated (event-driven cache)
Cache::rememberForever("config:plans", fn() => Plan::all());
// Invalidate on change:
Cache::forget("config:plans");
```

### Cache Stampede Prevention
```php
// Without protection: 1000 simultaneous requests all miss cache and hit DB
// With atomic lock:
$value = Cache::flexible("t:{$tid}:report", [30, 60], fn() => $this->buildReport());
// flexible() = serve stale while refreshing in background (Laravel 11+)
```

---

## 3. PAGINATION

### Offset Pagination (simple, for small datasets)
```php
$items = Invoice::paginate(20);          // LIMIT 20 OFFSET (page-1)*20
$items = Invoice::simplePaginate(20);    // no total count query
// Problem: slow on page 500+ (OFFSET 10000 scans 10000 rows)
```

### Cursor Pagination (production, large datasets)
```php
$items = Invoice::orderBy('id')->cursorPaginate(20);
// Uses WHERE id > :cursor — O(log n) via index, always fast
// ✅ Use for: infinite scroll, APIs, large tables
// ❌ Don't use when: need random page access ("go to page 47")
```

---

## 4. CONCURRENCY — Preventing Race Conditions

### Pessimistic Locking (DB-level, guaranteed)
```php
// lockForUpdate: no other transaction can read or modify
DB::transaction(function () use ($invoice) {
    $invoice = Invoice::lockForUpdate()->find($invoice->id);
    if ($invoice->status === 'unpaid') {
        $invoice->update(['status' => 'paid']);
        $this->chargeStripe($invoice);
    }
});
```

### Optimistic Locking (no DB lock, retry on conflict)
```php
// Add: $table->unsignedBigInteger('version')->default(0);
$invoice = Invoice::find($id);
$affected = Invoice::where('id', $id)
                   ->where('version', $invoice->version)
                   ->update(['status' => 'paid', 'version' => $invoice->version + 1]);
if ($affected === 0) {
    throw new ConcurrentModificationException('Invoice was modified by another process');
}
```

### Atomic Redis Lock (idempotency for payments)
```php
// Prevent double-processing webhook
$lock = Cache::lock("webhook:{$webhookId}", 30);
if ($lock->get()) {
    try {
        $this->processWebhook($payload);
    } finally {
        $lock->release();
    }
}
// If lock not acquired: duplicate webhook, skip silently
```

---

## 5. IDEMPOTENCY (Critical for Payments)

Every payment/billing operation must be idempotent:

```php
class ProcessPayment {
    public function handle(string $idempotencyKey, array $payload): void {
        // Check if already processed
        if (Payment::where('idempotency_key', $idempotencyKey)->exists()) {
            return; // already done — safe to return
        }

        DB::transaction(function () use ($idempotencyKey, $payload) {
            Payment::create([
                'idempotency_key' => $idempotencyKey,
                'amount'          => $payload['amount'],
                'status'          => 'processing',
            ]);
            // Now charge Stripe
            $this->stripe->charge($payload);
        });
    }
}
```

---

## 6. EXPONENTIAL BACKOFF (Retry Strategy)

```php
class CallExternalApi implements ShouldQueue {
    public int $tries   = 5;
    public int $maxExceptions = 3;

    // Retry at: 30s, 60s, 120s, 240s, 480s
    public function backoff(): array {
        return [30, 60, 120, 240, 480];
    }

    public function retryUntil(): DateTime {
        return now()->addHours(2); // give up after 2 hours total
    }
}
```

---

## 7. INDEXING STRATEGY

```php
// Single column
$table->index('status');
$table->index('tenant_id');

// Composite — order matters! Most selective / most queried first
$table->index(['tenant_id', 'status']);         // WHERE tenant_id=X AND status=Y
$table->index(['tenant_id', 'created_at']);     // WHERE tenant_id=X ORDER BY created_at

// Unique scoped to tenant
$table->unique(['tenant_id', 'email']);
$table->unique(['tenant_id', 'slug']);

// Covering index — query only touches index, never the table
$table->index(['tenant_id', 'status', 'created_at', 'id']);
// SELECT id, status FROM invoices WHERE tenant_id=X AND status='paid' ORDER BY created_at
// ↑ This query is 100% served by the index
```

---

## 8. BINARY SEARCH USE CASES IN LARAVEL

```php
// Plan feature gates — sorted array of feature thresholds
$planLimits = [
    'starter'    => 10,
    'business'   => 100,
    'enterprise' => PHP_INT_MAX,
];

// Laravel Collection sort + search
$plans = collect($planLimits)->sort();
$appropriatePlan = $plans->first(fn($limit) => $limit >= $userNeeds);
```

---

## 9. CONSISTENT HASHING (for distributed caches)

```php
// Shard tenants across Redis nodes without global rehashing on scale
class TenantHashRouter {
    private array $nodes;

    public function getNode(string $tenantId): string {
        $hash = crc32($tenantId);
        return $this->nodes[$hash % count($this->nodes)];
    }
}
```
