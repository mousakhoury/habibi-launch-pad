<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\Quests;

class UserQuests extends Model
{
    use HasFactory;

    protected $casts = [
        'is_completed' => 'boolean',
        'is_locked' => 'boolean',
    ];

    protected $fillable = ['account_id', 'quest_id', 'is_completed', 'is_locked'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function quest()
    {
        return $this->belongsTo(Quests::class);
    }
}
