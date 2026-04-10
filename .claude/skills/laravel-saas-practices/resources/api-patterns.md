# API Patterns Reference

## API Resources — Consistent Response Shape

```php
// Single resource
class InvoiceResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id'         => $this->id,
            'amount'     => $this->price->formatted(),  // custom cast
            'status'     => $this->status,
            'created_at' => $this->created_at->toISOString(),
            // Conditional fields — only when requested or allowed
            'tenant'     => $this->whenLoaded('tenant', TenantResource::make($this->tenant)),
            'items'      => InvoiceItemResource::collection($this->whenLoaded('items')),
            'secret'     => $this->when($request->user()->isAdmin(), $this->internal_note),
        ];
    }
}

// Collection with metadata
class InvoiceCollection extends ResourceCollection {
    public function toArray(Request $request): array {
        return [
            'data'    => $this->collection,
            'summary' => ['total' => $this->collection->sum('amount')],
        ];
    }
}
```

## Response Macros (standardized API responses)

```php
// In AppServiceProvider::boot()
Response::macro('success', fn($data = null, string $msg = 'OK', int $code = 200) =>
    response()->json(['success' => true, 'message' => $msg, 'data' => $data], $code)
);

Response::macro('error', fn(string $msg, int $code = 400, array $errors = []) =>
    response()->json(['success' => false, 'message' => $msg, 'errors' => $errors], $code)
);

// Usage in controllers
return response()->success(InvoiceResource::make($invoice), 'Invoice created', 201);
return response()->error('Validation failed', 422, $validator->errors()->toArray());
```

## API Versioning

```php
// routes/api/v1.php
Route::apiResource('invoices', Api\V1\InvoiceController::class);

// routes/api/v2.php
Route::apiResource('invoices', Api\V2\InvoiceController::class);

// bootstrap/app.php (Laravel 11+)
->withRouting(
    api: __DIR__.'/../routes/api.php',
    apiPrefix: 'api',
)
```

## Form Requests (validation + auth in one place)

```php
class StoreInvoiceRequest extends FormRequest {
    public function authorize(): bool {
        return $this->user()->can('create', Invoice::class);
    }

    public function rules(): array {
        return [
            'amount'      => ['required', 'integer', 'min:100'],
            'currency'    => ['required', 'in:MXN,USD,EUR'],
            'due_date'    => ['required', 'date', 'after:today'],
            'items'       => ['required', 'array', 'min:1'],
            'items.*.sku' => ['required', 'string'],
            'items.*.qty' => ['required', 'integer', 'min:1'],
        ];
    }

    public function messages(): array {
        return [
            'amount.min' => 'Minimum invoice amount is $1.00',
        ];
    }

    // Transform input before validation
    protected function prepareForValidation(): void {
        $this->merge(['amount' => (int) ($this->amount * 100)]); // to cents
    }
}
```

## Query String Filtering Pattern (Spatie QueryBuilder)

```bash
composer require spatie/laravel-query-builder
```

```php
// Automatic filtering, sorting, including from query string
$invoices = QueryBuilder::for(Invoice::class)
    ->allowedFilters(['status', 'currency', AllowedFilter::scope('paid_after')])
    ->allowedSorts(['amount', 'created_at', 'due_date'])
    ->allowedIncludes(['items', 'tenant', 'user'])
    ->paginate(20);

// URL: /api/invoices?filter[status]=paid&sort=-created_at&include=items&page=2
```

## API Authentication with Sanctum + Tenant Context

```php
// routes/api.php
Route::middleware(['auth:sanctum', 'tenant'])->group(function () {
    Route::apiResource('invoices', InvoiceController::class);
});

// Token with abilities (scoped permissions)
$token = $user->createToken('mobile-app', [
    'tenant:'.$tenant->id,
    'invoices:read',
    'invoices:create',
])->plainTextToken;

// Check in controller
$request->user()->tokenCan('invoices:create');
```

## OpenAPI / Swagger (documentation)

```bash
composer require dedoc/scramble   # auto-generates from code, no annotations needed
```

```php
// config/scramble.php
'api_path' => 'api',
// Visit /docs/api — auto-generated from your Form Requests, Resources, and return types
```
