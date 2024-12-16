<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Filament\Resources\NewsResource\RelationManagers;
use App\Models\News;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;


class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Toggle::make('is_published')
                    ->label('Published')
                    ->onIcon('heroicon-s-check')
                    ->offIcon('heroicon-s-x')
                    ->onColor('success') // The color when the toggle is on (optional)
                    ->offColor('danger'),
                Toggle::make('is_launchpad')
                    ->label('Publish in Landing Page')
                    ->onIcon('heroicon-s-check')
                    ->offIcon('heroicon-s-x')
                    ->onColor('success') // The color when the toggle is on (optional)
                    ->offColor('danger'),
                TextInput::make('title')
                    ->afterStateUpdated(function (Closure $get, Closure $set, ?string $state) {
                        if (!$get('is_slug_changed_manually') && filled($state)) {
                            $slugBase = Str::slug($state);
                            $slug = $slugBase;
                            $counter = 1;

                            // Keep appending a number to the slug until we find one that doesn't exist
                            while (News::where('slug', $slug)->exists()) {
                                $slug = $slugBase . '-' . $counter;
                                $counter++;
                            }

                            $set('slug', $slug);
                        }
                    })
                    ->reactive()
                    ->required()->label('Title'),

                TextInput::make('slug')
                    ->afterStateUpdated(function (Closure $set) {
                        $set('is_slug_changed_manually', true);
                    })
                    ->required()->label('Slug'),
                Hidden::make('is_slug_changed_manually')
                    ->default(false)
                    ->dehydrated(false),
                FileUpload::make('image')
                    ->label('Image')
                    ->image()
                    ->disk('public'),
                TextInput::make('time')
                    ->label('Time to read (minutes)')
                    ->required(),
                Repeater::make('category')
                    ->schema([
                        TextInput::make('name')
                            ->label('Name')
                            ->required(),
                    ]),
                RichEditor::make('body')
                    ->toolbarButtons([
                        'attachFiles',
                        'blockquote',
                        'bold',
                        'bulletList',
                        'codeBlock',
                        'h2',
                        'h3',
                        'italic',
                        'link',
                        'orderedList',
                        'redo',
                        'strike',
                        'underline',
                        'undo',
                    ])
                    ->label('Body')
                    ->required(),

                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->default(auth()->id())
                    ->label('Author')
                    ->required(),
            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ToggleColumn::make('is_published')
                    ->searchable()
                    ->sortable()
                    ->onIcon('heroicon-s-check')
                    ->offIcon('heroicon-s-x')
                    ->onColor('success') // The color when the toggle is on (optional)
                    ->offColor('danger')
                    ->label('Published'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->label('Title'),
                TextColumn::make('user.name')
                    ->searchable()
                    ->sortable()
                    ->label('Author'),
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
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
