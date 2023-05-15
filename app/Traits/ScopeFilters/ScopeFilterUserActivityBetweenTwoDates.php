<?php

namespace App\Traits\ScopeFilters;
/**
 * This trait contains filter user activitys
 * @param query
 * @param data array
 */
trait ScopeFilterUserActivityBetweenTwoDates
{
    /**
     * @return 
     */
    public function scopeFilterUserActivityBetweenTwoDates($query, $data)
    {
        return $query->where('user_id',$data['user_id'])
        ->whereBetween('activityDateFrom',[$data['activiyFilterDateFrom'],$data['activiyFilterDateTo']])
        ->get();
    }
}