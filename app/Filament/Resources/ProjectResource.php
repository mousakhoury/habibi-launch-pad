<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Carbon\Carbon;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use App\Filament\Resources\ProjectResource\Actions\DuplicateProjectAction;



class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Tabs')->tabs([
                    Tabs\Tab::make('Project Info')
                        ->schema([
                            Toggle::make('is_published')
                                ->label('Published')
                                ->onIcon('heroicon-s-check')
                                ->offIcon('heroicon-s-x')
                                ->onColor('success') // The color when the toggle is on (optional)
                                ->offColor('danger'),
                            TextInput::make('name')
                                ->afterStateUpdated(function (Closure $get, Closure $set, ?string $state) {
                                    if (!$get('is_slug_changed_manually') && filled($state)) {
                                        $slugBase = Str::slug($state);
                                        $slug = $slugBase;
                                        $counter = 1;

                                        // Keep appending a number to the slug until we find one that doesn't exist
                                        while (Project::where('slug', $slug)->exists()) {
                                            $slug = $slugBase . '-' . $counter;
                                            $counter++;
                                        }

                                        $set('slug', $slug);
                                    }
                                })
                                ->reactive()
                                ->required()->label('Name'),
                            TextInput::make('slug')
                                ->afterStateUpdated(function (Closure $set) {
                                    $set('is_slug_changed_manually', true);
                                })
                                ->required()->label('Slug'),
                            Hidden::make('is_slug_changed_manually')
                                ->default(false)
                                ->dehydrated(false),
                            FileUpload::make('main_image')
                                ->label('Banner Image')
                                ->image()
                                ->disk('public')
                                ->acceptedFileTypes(['image/*']),
                            TextInput::make('sub_name')
                                ->required()
                                ->label('Token Symbol'),
                            TextInput::make('subtitle')
                                ->label('Launchpad Subtitle'),
                            TextInput::make('pool_id')
                                ->label('Pool ID'),
                            Select::make('type')
                                ->options([
                                    'All' => 'All',
                                    'Master' => 'Master',
                                    'Diamond' => 'Diamond',
                                ])
                                ->label('Type'),
                            FileUpload::make('logo')
                                ->label('Card Image')
                                ->image()
                                ->disk('public')
                                ->acceptedFileTypes(['image/*']),
                            Select::make('fundraising_chain')
                                ->options([
                                    'BSC' => 'BSC',
                                    'Polygon' => 'Polygon',
                                    'ETH' => 'ETH',
                                    'Solana' => 'Solana',
                                ])
                                ->required()
                                ->label('Fundraising Chain'),
                            Select::make('distribution_chain')
                                ->options([
                                    'BSC' => 'BSC',
                                    'Polygon' => 'Polygon',
                                    'ETH' => 'ETH',
                                    'Solana' => 'Solana',
                                ])
                                ->required()
                                ->label('Distribution Chain'),
                            RichEditor::make('about')
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
                                ->label('About'),
                            TextInput::make('vesting')
                                ->required()
                                ->label('Vesting'),
                            TextInput::make('website')
                                ->required()
                                ->label('Website'),
                            TextInput::make('telegrem')
                                ->required()
                                ->label('Telegram'),
                            TextInput::make('twitter')
                                ->required()
                                ->label('Twitter'),
                            TextInput::make('price')
                                ->numeric()
                                ->required()
                                ->label('Price'),
                            TextInput::make('amount_target')
                                ->numeric()
                                ->required()
                                ->label('Amount Target'),
                            TextInput::make('fcfs1_amount')
                                ->numeric()
                                ->required()
                                ->label('FCFS1 Max Amount'),
                            TextInput::make('fcfs2_amount')
                                ->numeric()
                                ->required()
                                ->label('FCFS2 Max Amount'),

                            TextInput::make('deal_type')
                                ->required()
                                ->label('Deal Type'),
                            TextInput::make('distribution_type')
                                ->label('Distribution Type'),

                        ]),
                    Tabs\Tab::make('Project Dates')
                        ->schema([
                            // DateTimePicker::make('register_starting_date')
                            //     ->label('Register Starting Date')
                            //     ->displayFormat('m/d/Y h:i A')
                            //     ->format('Y-m-d H:i:s'),
                            // DateTimePicker::make('register_deadline')
                            //     ->label('Register Deadline')
                            //     ->displayFormat('m/d/Y h:i A')
                            //     ->format('Y-m-d H:i:s'),
                            DateTimePicker::make('starting_date')
                                ->label('First Round Starting Date')
                                ->displayFormat('m/d/Y h:i A')
                                ->format('Y-m-d H:i:s'),
                            TextInput::make('first_round_duration')
                                ->numeric()
                                ->label('First Round Duration (minutes)'),
                            TextInput::make('pause_duration')
                                ->numeric()
                                ->label('Pause Duration (minutes)'),
                            TextInput::make('fcfs1_duration')
                                ->numeric()
                                ->label('FCFS1 Duration (minutes)'),
                            DateTimePicker::make('deadline')
                                ->label('DeadLine')
                                ->displayFormat('m/d/Y h:i A')
                                ->format('Y-m-d H:i:s'),
                        ]),

                    Tabs\Tab::make('Tokenomics')
                        ->schema([
                            TextInput::make('market_cap')
                                ->numeric()
                                ->label('Market cap'),
                            TextInput::make('fdmc')
                                ->numeric()
                                ->label('FDMC'),
                            TextInput::make('total_supply')
                                ->numeric()
                                ->label('Total Supply'),
                            TextInput::make('circulating')
                                ->numeric()
                                ->label('Circulating'),
                        ]),
                    Tabs\Tab::make('Claim Info')->schema([
                        TextInput::make('claimed_percentage')
                            ->numeric()
                            ->label('Claimed Percentage'),
                        DateTimePicker::make('next_claim_date')
                            ->label('Next Claim Date')
                            ->displayFormat('m/d/Y h:i A')
                            ->format('Y-m-d H:i:s'),
                    ]),
                    Tabs\Tab::make('Chart')
                        ->schema([
                            Repeater::make('chart')
                                ->schema([
                                    TextInput::make('name')
                                        ->label('Name')
                                        ->required(),
                                    TextInput::make('percentage')
                                        ->label('Percentage')
                                        ->required(),
                                    Select::make('color')
                                        ->label('Color')
                                        ->options([
                                            '#E57373' => 'Soft Red',
                                            '#4FC3F7' => 'Sky Blue',
                                            '#E0E0E0' => 'Light Gray',
                                            '#BA68C8' => 'Mauve',
                                            '#AED581' => 'Mint Green',
                                            '#FF8A65' => 'Coral Pink',
                                            '#FFAB91' => 'Peach Orange',
                                            '#FFF176' => 'Lemon Yellow',
                                            '#DCE775' => 'Lime Green',
                                            '#9FA8DA' => 'Periwinkle Blue',
                                            '#B39DDB' => 'Lavender Purple',
                                            '#D2B48C' => 'Tan Brown',
                                        ])
                                        ->required(),
                                ])
                        ]),
                    Tabs\Tab::make('White List')
                        ->schema([
                            Repeater::make('white_list')
                                ->schema([
                                    TextInput::make('address')
                                        ->label('Address')
                                        ->required(),
                                ])
                        ])
                ]),

            ])->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->searchable()
                    ->sortable()
                    ->label('ID'),
                ToggleColumn::make('is_published')
                    ->searchable()
                    ->sortable()
                    ->onIcon('heroicon-s-check')
                    ->offIcon('heroicon-s-x')
                    ->onColor('success') // The color when the toggle is on (optional)
                    ->offColor('danger')
                    ->label('Published'),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->label('Name'),
                TextColumn::make('price')
                    ->searchable()
                    ->sortable()
                    ->label('Price'),
                TextColumn::make('amount_target')
                    ->searchable()
                    ->sortable()
                    ->label('Amount Target'),
                TextColumn::make('fcfs1_amount')
                    ->searchable()
                    ->sortable()
                    ->label('FCFS1 Max Amount'),
                TextColumn::make('fcfs2_amount')
                    ->searchable()
                    ->sortable()
                    ->label('FCFS2 Max Amount'),
                TextColumn::make('starting_date')
                    ->searchable()
                    ->sortable()
                    ->label('First Round Starting Date')
                    ->formatStateUsing(fn ($state) => $state ? $state->timezone('Europe/Istanbul')->format('m/d/Y, h:i A T') : ''),

            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                DuplicateProjectAction::make('duplicate'),
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
