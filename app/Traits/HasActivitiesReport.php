<?php

namespace App\Traits;
use App\Models\ActivityReport;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasActivitiesReport
{
    /**
     * @return HasMany
     */
    public function activityReports(): HasMany
    {
        return $this->hasMany(ActivityReport::class);
    }
}
