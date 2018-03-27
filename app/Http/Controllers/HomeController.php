<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth()->user();
        $tags = ['users',"{$user->name}{$user->email}"];
        $fb = Cache::tags($tags)->get("{$user->id}_facebook");
        $tw = Cache::tags($tags)->get("{$user->id}_twitter");
        $ig = Cache::tags($tags)->get("{$user->id}_instagram");
        $data = [
            'fb' => $fb,
            'tw' => $tw,
            'ig' => $ig,
        ];
        return view('home', compact('data'));
    }
}
