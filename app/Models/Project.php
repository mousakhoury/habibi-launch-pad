<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['pool_id', 'is_published', 'name', 'slug', 'sub_name', 'subtitle', 'logo', 'price', 'amount_target', 'fcfs1_amount', 'fcfs2_amount', 'main_image', 'type', 'deal_type', 'register_starting_date', 'register_deadline', 'starting_date', 'first_round_deadline', 'fcfs_starting_date', 'fcfs_deadline_date', 'fcfs2_starting_date', 'deadline', 'first_round_duration', 'pause_duration', 'fcfs1_duration', 'fundraising_chain', 'distribution_chain', 'distribution_type', 'market_cap', 'fdmc', 'total_supply', 'circulating', 'about', 'vesting', 'website', 'telegrem', 'twitter', 'chart', 'white_list', 'fake_number', 'next_claim_date', 'claimed_percentage'];
    protected $casts = [
        'register_starting_date' => 'datetime',
        'register_deadline' => 'datetime',
        'starting_date' => 'datetime',
        'first_round_deadline' => 'datetime',
        'fcfs_starting_date' => 'datetime',
        'fcfs_deadline_date' => 'datetime',
        'fcfs2_starting_date' => 'datetime',
        'deadline' => 'datetime',
        'next_claim_date' => 'datetime',
        'chart' => 'array',
        'white_list' => 'array',
    ];
}
