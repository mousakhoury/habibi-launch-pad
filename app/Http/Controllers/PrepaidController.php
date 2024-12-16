<?php

namespace App\Http\Controllers;

use App\Http\Services\BrandService;
use App\Mail\SendCardMail;
use App\Models\Account;
use App\Models\PrepaidImage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PrepaidController extends Controller
{
    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    public function showPrepaid(Request $request)
    {
        // Retrieve accounts data
        $accounts = Account::all();
        $images = PrepaidImage::all();

        // Use a service to handle the API call and response for countries
        $countries = $this->brandService->getAllCountries();

        // Determine the default country
        $defaultCountry = in_array('USA', $countries) ? 'USA' : reset($countries);

        // Retrieve the country from the query parameter or set default based on $countries content
        $country = $request->query('country', $defaultCountry);

        // Use a service to handle the API call and response for brands
        $brands = $this->brandService->getBrandsForCountry($country);

        // Prepare the data to be sent to the view
        return Inertia::render('PrePaid', [
            'countries' => $countries,
            'accounts'  => $accounts,
            'brands'    => $brands,
            'images'    => $images
        ]);
    }

    public function purchaseCard(Request $request)
    {
        $client = new Client();

        // Validate incoming request data
        $validated = $request->validate([
            'orderId' => 'required|string',
            'price' => 'required|numeric',
            'productId' => 'required|int',
            'email' => 'required|email',
            'fName' => 'required|string',
            'lName' => 'required|string'
        ]);

        // Additional data that might be needed
        $externalUserId = 'user_id_001'; // This should ideally come from the request or your application context

        $body = [
            'orderId' => $validated['orderId'],
            'price' => $validated['price'],
            'productId' => $validated['productId'],
            'externalUserId' => $externalUserId
        ];

        // API and security config
        $apiKey = env('apiKey');
        $requestSecret = env('requestSecret');

        // Prepare request
        $jsonBody = json_encode($body);
        $path = '/purchase';
        $requestMethod = 'POST';
        $toSign = $requestMethod . $path . $requestSecret . $jsonBody;
        $signature = hash('sha256', $toSign);

        try {
            $response = $client->request('POST', 'https://api.sandbox.phaze.io/purchase', [
                'headers' => [
                    'API-Key' => $apiKey,
                    'Content-Type' => 'application/json',
                    'Signature' => $signature
                ],
                'body' => $jsonBody
            ]);

            $responseData = json_decode($response->getBody()->getContents(), true);
            if ($responseData) {
                // Return the combined result of purchase and email sending
                return response()->json([
                    'purchaseMessage' => 'Purchase successful!',
                ]);
            }

            return response()->json($responseData);
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function ShowSelectedCard(Request $request)
    {
        $validated = $request->validate([
            'orderId' => 'required|string',
            'email' => 'required|email',
        ]);

        $orderId = $validated['orderId'];
        $email = $validated['email'];

        $body = '';
        $path = "/transaction/{$orderId}";
        $signature = hash('sha256', 'GET' . $path . env('requestSecret') . $body);

        $response = Http::withHeaders([
            'API-Key' => env('apiKey'),
            'Signature' => $signature,
        ])->get(env('baseUrl') . $path);

        if ($response->successful()) {
            try {
                $cardDetails = json_decode($response->body(), true); // Decode JSON to array

                Mail::to($email)->send(new SendCardMail($cardDetails));
                return response()->json(['message' => 'Email sent successfully']);
            } catch (\Exception $e) {
                Log::error("Failed to send email: " . $e->getMessage(), [
                    'email' => $email,
                    'orderId' => $orderId
                ]);
                return response()->json([
                    'error' => true,
                    'message' => 'Failed to send email.'
                ], 500);
            }
        } else {
            Log::error("Failed to fetch transaction details: ", [
                'status' => $response->status(),
                'response' => $response->body()
            ]);
            return response()->json([
                'error' => true,
                'status' => $response->status(),
                'message' => 'Failed to process transaction details.'
            ], $response->status());
        }
    }
}
