<?php

namespace App\Listeners;

class UserLoggedOut
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     *
     * @return void
     */
    public function handle($event)
    {
        $user = $event->user ?? null;
        if ($user) {
            \Cache::tags("{$user->name}{$user->email}")->flush();
        }
    }
}
