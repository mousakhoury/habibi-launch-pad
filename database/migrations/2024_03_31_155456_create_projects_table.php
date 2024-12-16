<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('is_published')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->unique()->nullable();
            $table->string('sub_name')->nullable();
            $table->string('subtitle')->nullable();
            $table->string('logo')->nullable();
            $table->string('price')->nullable();
            $table->string('amount_target')->nullable();
            $table->string('fcfs1_amount')->nullable();
            $table->string('fcfs2_amount')->nullable();
            $table->string('main_image')->nullable();
            $table->string('pool_id')->nullable();
            $table->string('type')->nullable();
            $table->string('deal_type')->nullable();
            $table->dateTime('register_starting_date')->nullable();
            $table->dateTime('register_deadline')->nullable();
            $table->dateTime('starting_date')->nullable();
            $table->dateTime('first_round_deadline')->nullable();
            $table->dateTime('fcfs_starting_date')->nullable();
            $table->dateTime('fcfs_deadline_date')->nullable();
            $table->dateTime('fcfs2_starting_date')->nullable();
            $table->dateTime('deadline')->nullable();
            $table->string('first_round_duration')->nullable();
            $table->string('pause_duration')->nullable();
            $table->string('fcfs1_duration')->nullable();


            $table->string('fundraising_chain')->nullable();
            $table->string('distribution_chain')->nullable();
            $table->string('distribution_type')->nullable();
            $table->string('market_cap')->nullable();
            $table->string('fdmc')->nullable();
            $table->string('total_supply')->nullable();
            $table->string('circulating')->nullable();
            $table->longText('about')->nullable();
            $table->string('vesting')->nullable();
            $table->string('website')->nullable();
            $table->string('telegrem')->nullable();
            $table->string('twitter')->nullable();
            $table->longText('chart')->nullable();
            $table->longText('white_list')->nullable();
            $table->string('fake_number')->nullable();
            $table->string('claimed_percentage')->nullable();
            $table->string('next_claim_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
