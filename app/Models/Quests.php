<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Account;
use App\Models\UserQuests;

class Quests extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'type', 'url', 'xp', 'people_completed', 'details'];

    protected static function booted()
    {
        static::created(function ($quest) {
            $accounts = Account::all();
            foreach ($accounts as $account) {
                UserQuests::create([
                    'account_id' => $account->id,
                    'quest_id' => $quest->id,
                    'is_completed' => false,
                    'is_locked' => true,
                ]);
            }
        });
    }

    public function userQuests()
    {
        return $this->hasMany(UserQuests::class);
    }
}
