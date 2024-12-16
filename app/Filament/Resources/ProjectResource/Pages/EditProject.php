<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use Carbon\Carbon;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProject extends EditRecord
{
    protected static string $resource = ProjectResource::class;



    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }


    public function save(bool $shouldRedirect = true): void
    {
        $this->form->validate();

        // Get the form state
        $data = $this->form->getState();

        // Check if starting_date is not null
        if ($data['starting_date']) {
            $startingDate = Carbon::parse($data['starting_date']);
            $data['first_round_deadline'] = $startingDate->copy()->addMinutes($data['first_round_duration'])->format('Y-m-d H:i:s');
            $data['fcfs_starting_date'] = $startingDate->copy()->addMinutes($data['first_round_duration'] + $data['pause_duration'])->format('Y-m-d H:i:s');
            $data['fcfs_deadline_date'] = $startingDate->copy()->addMinutes($data['first_round_duration'] + $data['pause_duration'] + $data['fcfs1_duration'])->format('Y-m-d H:i:s');
            $data['fcfs2_starting_date'] = $startingDate->copy()->addMinutes($data['first_round_duration'] + 2 * $data['pause_duration'] + $data['fcfs1_duration'])->format('Y-m-d H:i:s');
        } else {
            // If starting_date is null, set all related fields to null
            $data['first_round_deadline'] = null;
            $data['fcfs_starting_date'] = null;
            $data['fcfs_deadline_date'] = null;
            $data['fcfs2_starting_date'] = null;
        }

        // Save the record with the updated data
        $this->record->fill($data);
        $this->record->save();

        // Optionally redirect after save
        // if ($shouldRedirect) {
        //     $this->redirect($this->getResource()::getUrl('index'));
        // }
    }
}
