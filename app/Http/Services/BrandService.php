<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class BrandService
{
    public function getBrandsForCountry($country)
    {
        $path = "/brands/country/{$country}?currentPage=1";
        $signature = $this->generateSignature('GET', $path);

        $response = $this->makeRequest($path, $signature);

        return $response->successful() ? $response->json() : [];
    }


    public function getAllCountries()
    {
        // Consider using caching for country list
        return Cache::remember('countries', 60 * 60, function () {
            $path = '/brands/countries';
            $signature = $this->generateSignature('GET', $path);
            $response = $this->makeRequest($path, $signature);

            return $response->successful() ? $response->json() : [];
        });
    }

    protected function generateSignature($method, $path, $body = '')
    {
        $secret = config('services.phaze.requestSecret');
        $signature = hash('sha256', $method . $path . $secret . $body);
        Log::info("Signature for {$path}: {$signature}");

        return $signature;
    }

    protected function makeRequest($path, $signature)
    {
        return Http::withHeaders([
            'API-Key' => config('services.phaze.apiKey'),
            'Signature' => $signature,
        ])->get(config('services.phaze.apiUrl') . $path);
    }
}
