<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class AccountController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'twitter_id' => 'nullable|string',
            'twitter_token' => 'nullable|string',
            'address' => 'required|string|unique:accounts,address',
            'staked_amount' => 'nullable|string',
            'tier' => 'nullable|string',
            'isSpecial' => 'nullable|boolean',
            'points' => 'nullable|boolean',

        ]);

        // If staked_amount is provided, determine the tier and isSpecial fields
        if (isset($validated['staked_amount'])) {
            $validated['tier'] = $this->determineTier($validated['staked_amount']);
            $validated['isSpecial'] = $validated['staked_amount'] >= 5000000000;
        } else {
            // If staked_amount is not provided, set default values
            $validated['tier'] = 'no tier';
            $validated['isSpecial'] = false;
        }

        $validated['isSpotted'] = false;

        // Generate a unique code
        $validated['code'] = $this->generateUniqueCode();

        $account = Account::firstOrCreate(
            ['address' => $validated['address']], // Condition to check for existence
            $validated // Attributes to include if a new record is created
        );

        $wasRecentlyCreated = $account->wasRecentlyCreated;

        return response()->json([
            'message' => $wasRecentlyCreated ? 'Account created successfully' : 'Account already exists',
            'account' => $account,
            'wasRecentlyCreated' => $wasRecentlyCreated
        ]);
    }

    public function check($account)
    {
        $exists = Account::where('address', $account)->exists();
        return response()->json(['exists' => $exists]);
    }



    private function generateUniqueCode()
    {
        $code = '';
        do {
            $code = strtoupper(Str::random(6)); // Generate a random 6-character string
            // Check if code already exists
            $codeExists = Account::where('code', $code)->exists();
        } while ($codeExists);  // Keep generating a new code if it already exists

        return $code;
    }

    public function updateStakedAmount(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|exists:accounts,address',
            'staked_amount' => 'required|numeric', // Make sure this validation rule matches your requirements
        ]);

        try {
            $account = Account::where('address', $validated['address'])->first();

            if ($account) {
                $tier = $this->determineTier($validated['staked_amount']);
                $isSpecial = $validated['staked_amount'] >= 5000000000;
                $isSpotted = $validated['staked_amount'] < 5000000000;


                $account->update([
                    'staked_amount' => $validated['staked_amount'],
                    'tier' => $tier,
                    'isSpecial' => $isSpecial,
                    'isSpotted' =>  $isSpotted
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Staked amount and tier updated successfully.',
                    'account' => $account
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Account not found.'
            ]);
        } catch (\Exception $e) {
            // Handle exception
            return response()->json([
                'success' => false,
                'message' => 'Failed to update staked amount and tier.',
                'error' => $e->getMessage()
            ]);
        }
    }

    private function determineTier($amount)
    {
        if ($amount >= 10000000000) {
            return "Master";
        } else if ($amount >= 5000000000) {
            return "Diamond";
        } else if ($amount >= 1000000000) {
            return "Platinum";
        } else if ($amount >= 200000000) {
            return "Gold";
        } else if ($amount >= 50000000) {
            return "Silver";
        } else if ($amount >= 10000000) {
            return "Bronze";
        } else {
            return "no tier";
        }
    }


    public function updateStatus(Request $request)
    {
        $request->validate([
            'address' => 'required|string|exists:accounts,address',
            'isSpotted' => 'required|boolean',
        ]);

        $account = Account::where('address', $request->address)->firstOrFail();
        $account->isSpotted = $request->isSpotted;
        $account->save();

        return response()->json(['message' => 'Account status updated successfully']);
    }
}
