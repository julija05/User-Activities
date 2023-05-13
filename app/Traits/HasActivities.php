<?php

namespace App\Traits;
use App\Models\Activity;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasActivities
{
    /**
     * @return HasMany
     */
    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class);
    }
}
