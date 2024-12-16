<?php

namespace App\Http\Controllers;

use App\Mail\SendRandomNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class RandomNumberController extends Controller
{
    public function send(Request $request)
    {
        $randomNumber = $request->input('randomNumber');
        $email = $request->input('email');
        Mail::to($email)->send(new SendRandomNumber($randomNumber));

        return response()->json(['message' => 'Email sent successfully']);
    }
}
