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
        $fb = Cache::tags('users')->get(auth()->user()->id . 'facebook');
        $tw = Cache::tags('users')->get(auth()->user()->id . 'twitter');
        $ig = Cache::tags('users')->get(auth()->user()->id . 'instagram');
        $data = [
            'fb' => $fb,
            'tw' => $tw,
            'ig' => $ig
        ];
        return view('home', compact('data'));
    }
}
