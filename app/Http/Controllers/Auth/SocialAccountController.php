<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class SocialAccountController extends Controller
{
    private $facebook = [
        'manage_pages',
        'instagram_basic',
        'instagram_manage_insights',
        'read_insights',
        'instagram_manage_comments',
        'read_custom_friendlists',
    ];
    private $instagram = [
        'public_content',
        'follower_list',
        'comments',
        'relationships',
        'likes',
    ];
    private $twitter = [

    ];
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @param mixed $provider
     *
     * @return Response
     */
    public function redirectToProvider($provider)
    {
        return \Socialite::driver($provider)->scopes($this->{$provider})->redirect();
    }

    /**
     * Obtain the user information
     *
     * @param mixed $provider
     *
     * @return Response
     */
    public function handleProviderCallback(\App\SocialAccountsService $accountService, $provider)
    {
        try {
            $user = \Socialite::with($provider)->scopes($this->{$provider})->user();
        } catch (\Exception $e) {
            return redirect('/login');
        }

        $authUser = $accountService->findOrCreate(
            $user,
            $provider
        );

        auth()->login($authUser, true);
        $auth = auth()->user();
        Cache::tags(['users',"{$auth->name}{$auth->email}"])->remember("{$auth->id}_{$provider}", 1440, function () use ($user, $provider) {
            return [
                'provider' => $provider,
                'token' => $user->token,
                'tokenSecret' => $user->tokenSecret ?? false,
                'refreshToken' => $user->refreshToken ?? false,
                'expiresIn' => $user->expiresIn ?? false,
            ];
        });

        return redirect()->to('/home');
    }
}
