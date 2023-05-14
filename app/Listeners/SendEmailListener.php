<?php

namespace App\Listeners;

use App\Events\SendEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendEmailListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SendEmail $event)
    {
        $id = $event->id;

        // Retrieve data based on the ID
        $data = MyModel::find($id);

        // Send email
        Mail::to($data->email)->send(new MyEmail($data));
    }
}
