<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Resources\Pages\CreateRecord;
use Carbon\Carbon;

class CreateProject extends CreateRecord
{
    protected static string $resource = ProjectResource::class;

    public function save(): void
    {
        $this->form->validate();

        // Perform your calculations here
        $data = $this->form->getState();
        $startingDate = Carbon::parse($data['starting_date']);
        $data['first_round_deadline'] = $startingDate->copy()->addMinutes($data['first_round_duration'])->format('Y-m-d H:i:s');
        $data['fcfs_starting_date'] = $startingDate->copy()->addMinutes($data['first_round_duration'] + $data['pause_duration'])->format('Y-m-d H:i:s');
        $data['fcfs_deadline_date'] = $startingDate->copy()->addMinutes($data['first_round_duration'] + $data['pause_duration'] + $data['fcfs1_duration'])->format('Y-m-d H:i:s');
        $data['fcfs2_starting_date'] = $startingDate->copy()->addMinutes($data['first_round_duration'] + 2 * $data['pause_duration'] + $data['fcfs1_duration'])->format('Y-m-d H:i:s');

        // Save the record with the updated data
        $this->record->fill($data);
        $this->record->save();

        $this->redirect($this->getResource()::getUrl('index'));
    }
}
