<?php

namespace App\Filament\Resources\UserStakeResource\Pages;

use App\Filament\Resources\UserStakeResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserStake extends EditRecord
{
    protected static string $resource = UserStakeResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
