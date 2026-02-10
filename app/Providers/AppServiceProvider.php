<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.force_https')) {
            $appUrl = config('app.url');
            if (is_string($appUrl) && str_starts_with($appUrl, 'https://')) {
                URL::forceRootUrl($appUrl);
            }

            URL::forceScheme('https');

            $assetUrl = config('app.asset_url');
            if (is_string($assetUrl) && str_starts_with($assetUrl, 'http://')) {
                URL::useAssetOrigin('https://'.substr($assetUrl, strlen('http://')));
            }
        }
    }
}
