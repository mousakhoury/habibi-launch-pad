<?php

namespace App\Filament\Resources\UserStakeResource\Pages;

use App\Filament\Resources\UserStakeResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserStakes extends ListRecords
{
    protected static string $resource = UserStakeResource::class;

    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
