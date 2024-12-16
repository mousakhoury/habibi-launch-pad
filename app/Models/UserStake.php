<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStake extends Model
{
    use HasFactory;
    protected $fillable = ['address', 'status', 'amount', 'transaction_hash'];
}
