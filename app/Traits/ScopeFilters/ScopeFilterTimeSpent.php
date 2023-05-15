<?php

namespace App\Traits\ScopeFilters;
use Illuminate\Support\Facades\DB;
/**
 * This trait contains filter user activitys
 * @param query
 */
trait ScopeFilterTimeSpent
{
    /**
     * @return 
     */
    public function scopeFilterTimeSpent($query)
    {
        return $query->select('activityDateFrom', DB::raw('SUM(activityTimeSpend) as activityTimeSpend'))
        ->where('user_id',  auth()->user()->id)
        ->groupBy('activityDateFrom');
    }
}