<?php

namespace App\Traits;

/**
 * This trait contains everything connected to hasMany(Event::class) relationship
 */
trait HasActivitiesTrait
{
    /**
     * @return HasMany
     */
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
