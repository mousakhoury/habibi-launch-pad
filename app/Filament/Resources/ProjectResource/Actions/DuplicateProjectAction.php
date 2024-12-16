<?php

namespace App\Filament\Resources\ProjectResource\Actions;

use Filament\Tables\Actions\Action;
use App\Models\Project;
use Illuminate\Support\Str;

class DuplicateProjectAction extends Action
{
    protected function setUp(): void
    {
        $this->label('Duplicate')
            ->icon('heroicon-o-document-duplicate')
            ->requiresConfirmation()
            ->action(function (Project $record) {
                // Ensure a new, unique slug is generated
                $newSlug = $record->slug . '-copy-' . Str::random(5);
                while (Project::where('slug', $newSlug)->exists()) {
                    $newSlug = $record->slug . '-copy-' . Str::random(5);
                }

                $newRecord = $record->replicate();
                $newRecord->slug = $newSlug; // Set unique slug
                $newRecord->save();

                // You may need to also duplicate relations or handle other duplications specifics here.

                $this->success('Project duplicated successfully.');
                $this->redirect(route('filament.resources.projects.edit', ['record' => $newRecord]));
            });
    }
}
