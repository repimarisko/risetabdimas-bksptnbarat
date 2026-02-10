<?php

namespace App\Http\Responses;

use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Fortify;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function toResponse($request)
    {
        $redirectUrl = $request instanceof Request
            ? $this->resolveSecureRedirectUrl($request)
            : (string) Fortify::redirects('login');

        return $request->wantsJson()
            ? response()->json(['two_factor' => false])
            : redirect()->to($redirectUrl);
    }

    protected function resolveSecureRedirectUrl(Request $request): string
    {
        $default = (string) Fortify::redirects('login');
        $target = $request->hasSession()
            ? $request->session()->pull('url.intended', $default)
            : $default;

        if (! is_string($target) || trim($target) === '') {
            $target = $default;
        }

        return $this->toSecureUrl($request, $target, $default);
    }

    protected function toSecureUrl(Request $request, string $target, string $fallback): string
    {
        $scheme = parse_url($target, PHP_URL_SCHEME);
        $host = parse_url($target, PHP_URL_HOST);

        if (! is_string($scheme) || $scheme === '') {
            return $this->buildSecureAbsoluteUrl($target);
        }

        if (strtolower($scheme) === 'https') {
            return $target;
        }

        if (strtolower($scheme) !== 'http') {
            return $this->buildSecureAbsoluteUrl($fallback);
        }

        $appHost = parse_url((string) config('app.url'), PHP_URL_HOST);
        $requestHost = $request->getHost();

        if (
            is_string($host)
            && $host !== ''
            && (
                ($appHost && $host === $appHost)
                || ($requestHost && $host === $requestHost)
            )
        ) {
            return preg_replace('/^http:\/\//i', 'https://', $target, 1) ?? $this->buildSecureAbsoluteUrl($fallback);
        }

        return $this->buildSecureAbsoluteUrl($fallback);
    }

    protected function buildSecureAbsoluteUrl(string $path): string
    {
        $normalizedPath = '/'.ltrim($path, '/');

        return url($normalizedPath, [], true);
    }
}
