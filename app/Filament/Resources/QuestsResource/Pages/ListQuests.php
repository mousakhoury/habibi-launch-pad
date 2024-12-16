<?php

namespace App\Filament\Resources\QuestsResource\Pages;

use App\Filament\Resources\QuestsResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListQuests extends ListRecords
{
    protected static string $resource = QuestsResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
