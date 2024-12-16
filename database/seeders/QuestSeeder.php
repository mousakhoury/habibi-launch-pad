<?php

namespace Database\Seeders;

use App\Models\Quests;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quests = [
            ['title' => 'First Quest', 'type' => 'type1', 'url' => 'url1', 'xp' => 100],
            ['title' => 'Second Quest', 'type' => 'type2', 'url' => 'url2', 'xp' => 200],
            // Add more quests as needed
        ];

        foreach ($quests as $quest) {
            Quests::create($quest);
        }
    }
}
