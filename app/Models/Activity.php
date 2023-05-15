<?php

namespace App\Models;
use App\Traits\BelongsToUser;
use App\Traits\ScopeFilters\ScopeFilterUserActivityBetweenTwoDates;
use App\Traits\ScopeFilters\ScopeFilterTimeSpent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;
    use BelongsToUser;
    use ScopeFilterUserActivityBetweenTwoDates;
    use scopeFilterTimeSpent;

    protected $fillable = [
        'activityTimeSpend',
        'activityDateFrom',
        'activityDescription',
        'user_id',
    ];

    protected $dates = [
        'activityDateFrom',
    ];
}
