<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Quests;
use App\Models\UserQuests;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserQuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = Account::all();
        foreach ($accounts as $account) {
            $quests = Quests::all();
            foreach ($quests as $index => $quest) {
                UserQuests::create([
                    'account_id' => $account->id,
                    'quest_id' => $quest->id,
                    'is_completed' => false,
                    'is_locked' => $index != 0, // Lock all quests except the first one
                ]);
            }
        }
    }
}
