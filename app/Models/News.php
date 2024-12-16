<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class News extends Model
{
    use HasFactory;
    protected $fillable = [
        'is_published',
        'is_launchpad',
        'title',
        'image',
        'category',
        'body',
        'user_id',
        'slug',
        'time',

    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function setCategoryAttribute($value)
    {
        $this->attributes['category'] = json_encode($value);
    }

    public function getCategoryAttribute($value)
    {
        return json_decode($value, true);
    }
}
