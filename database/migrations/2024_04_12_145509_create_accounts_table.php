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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('twitter_id')->unique()->nullable();
            $table->string('twitter_token')->nullable();
            $table->string('address')->unique();
            $table->string('staked_amount')->nullable();
            $table->string('tier')->nullable();
            $table->string('isSpecial')->default(false);
            $table->string('isSpotted')->default(false)->nullable();
            $table->string('code')->unique();
            $table->string('points')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
