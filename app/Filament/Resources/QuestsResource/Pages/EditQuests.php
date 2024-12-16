<?php

namespace App\Filament\Resources\QuestsResource\Pages;

use App\Filament\Resources\QuestsResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditQuests extends EditRecord
{
    protected static string $resource = QuestsResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
