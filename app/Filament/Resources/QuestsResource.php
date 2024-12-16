<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuestsResource\Pages;
use App\Filament\Resources\QuestsResource\RelationManagers;
use App\Models\Quests;
use Filament\Forms;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class QuestsResource extends Resource
{
    protected static ?string $model = Quests::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->required()
                    ->label('Title'),
                Select::make('type')
                    ->options([
                        'followX' => 'followX',
                        'joinTelegram' => 'joinTelegram',
                        'visitWebsite' => 'visitWebsite',
                    ])
                    ->required()
                    ->label('Type'),
                TextInput::make('url')
                    ->required()
                    ->label('URL'),
                TextInput::make('xp')
                    ->required()
                    ->label('XP'),
                RichEditor::make('details')
                    ->required()
                    ->label('Details'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->label('Title'),
                TextColumn::make('type')
                    ->searchable()
                    ->sortable()
                    ->label('Type'),
                TextColumn::make('xp')
                    ->searchable()
                    ->sortable()
                    ->label('XP'),
                TextColumn::make('people_completed')
                    ->searchable()
                    ->sortable()
                    ->label('People Completed'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuests::route('/'),
            'create' => Pages\CreateQuests::route('/create'),
            'edit' => Pages\EditQuests::route('/{record}/edit'),
        ];
    }
}
