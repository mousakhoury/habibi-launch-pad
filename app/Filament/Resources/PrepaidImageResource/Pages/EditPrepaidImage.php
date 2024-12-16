<?php

namespace App\Filament\Resources\PrepaidImageResource\Pages;

use App\Filament\Resources\PrepaidImageResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPrepaidImage extends EditRecord
{
    protected static string $resource = PrepaidImageResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
