<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class Activity extends Model
{
    use HasFactory;
    use BelongsToUser;

    protected $fillable = [
        'activityTimeSpend',
        'activityDateFrom',
        'activityDescription',
        'user_id'
    ];

    protected $dates = [
        'activityDateFrom',
    ];
}
