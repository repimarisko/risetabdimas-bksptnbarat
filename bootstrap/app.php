<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;



return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Trust reverse proxies / load balancers so Laravel can honor X-Forwarded-* headers.
        // Default to common private network ranges (works well for Docker / internal ingress).
        $trustedProxies = env('TRUSTED_PROXIES');
        $trustedProxies = is_string($trustedProxies) ? trim($trustedProxies) : $trustedProxies;

        $middleware->trustProxies(
            at: ($trustedProxies === null || $trustedProxies === '')
                ? '10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,127.0.0.1,::1'
                : $trustedProxies
        );

        $middleware->appendToGroup('web', [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
