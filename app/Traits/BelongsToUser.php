<?php

namespace App\Traits;

use App\Models\User;
use App\Traits\BelongsToUser;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * This trait contains everything connected to belongsTo(User::class) relationship
 */
trait BelongsToUser
{
    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
