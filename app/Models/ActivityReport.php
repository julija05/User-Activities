<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\BelongsToUser;

class ActivityReport extends Model
{
    use HasFactory;
    use HasUuids;
    use BelongsToUser;

    protected $fillable = [
        'activiyFilterDateFrom',
        'activiyFilterDateTo',
        'user_id'
    ];

    protected $dates = [
        'activiyFilterDateFrom',
        'activiyFilterDateTo',
    ];
}
