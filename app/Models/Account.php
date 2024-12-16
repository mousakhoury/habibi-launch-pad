<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Quests;
use App\Models\UserQuests;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'twitter_id', 'twitter_token', 'address', 'staked_amount', 'tier', 'isSpecial', 'isSpotted', 'code', 'points'
    ];

    protected $casts = [
        'isSpecial' => 'boolean',
        'isSpotted' => 'boolean',
        'points' => 'integer',
    ];

    protected static function booted()
    {
        static::created(function ($account) {
            $quests = Quests::all();
            foreach ($quests as $index => $quest) {
                UserQuests::create([
                    'account_id' => $account->id,
                    'quest_id' => $quest->id,
                    'is_completed' => false,
                    'is_locked' => $index != 0,
                ]);
            }
        });
    }

    public function userQuests()
    {
        return $this->hasMany(UserQuests::class);
    }
}
