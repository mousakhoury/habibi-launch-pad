<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PrepaidImageResource\Pages;
use App\Filament\Resources\PrepaidImageResource\RelationManagers;
use App\Models\PrepaidImage;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PrepaidImageResource extends Resource
{
    protected static ?string $model = PrepaidImage::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('image')
                    ->label('Image')
                    ->image()
                    ->disk('public'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->label('Image'),
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
            'index' => Pages\ListPrepaidImages::route('/'),
            'create' => Pages\CreatePrepaidImage::route('/create'),
            'edit' => Pages\EditPrepaidImage::route('/{record}/edit'),
        ];
    }
}
