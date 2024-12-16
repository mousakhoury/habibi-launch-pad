<?php

namespace App\Http\Controllers;

use App\Models\UserStake;
use Illuminate\Http\Request;

class UserStakeController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'address' => 'required',
            'status' => 'required',
            'amount' => 'required',
            'transaction_hash' => 'sometimes|required',
        ]);

        $userStake = UserStake::create($validatedData);

        return response()->json(['success' => true, 'data' => $userStake]);
    }
}
