<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserStakeResource\Pages;
use App\Filament\Resources\UserStakeResource\RelationManagers;
use App\Models\UserStake;
use Filament\Forms;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserStakeResource extends Resource
{
    protected static ?string $model = UserStake::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function canCreate(): bool
    {
        return false;
    }

    // Disable "Edit" button on each row
    public static function canEdit($record): bool
    {
        return false;
    }

    // Optionally, explicitly enable "View" - typically enabled by default
    public static function canView($record): bool
    {
        return true;
    }

    // Optionally, explicitly enable "Delete" - typically enabled by default
    public static function canDelete($record): bool
    {
        return true;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('address')
                    ->required()
                    ->label('Address'),
                TextInput::make('status')
                    ->required()
                    ->label('Status'),
                TextInput::make('amount')
                    ->required()
                    ->label('Amount'),
                TextInput::make('transaction_hash')
                    ->required()
                    ->label('Transaction Hash'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('address')
                    ->searchable()
                    ->sortable()
                    ->label('Address'),
                TextColumn::make('status')
                    ->searchable()
                    ->sortable()
                    ->label('Status'),
                TextColumn::make('amount')
                    ->searchable()
                    ->sortable()
                    ->label('Amount'),

            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
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

    public static function getQuery(): Builder
    {
        return parent::getQuery()->orderBy('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUserStakes::route('/'),
            'create' => Pages\CreateUserStake::route('/create'),
            'edit' => Pages\EditUserStake::route('/{record}/edit'),
        ];
    }
}
