<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;

class SocialAccountController extends Controller
{
    /**
     * Redirect the user to the GitHub authentication page.
     *
     * @return Response
     */
    public function redirectToProvider($provider)
    {
        return \Socialite::driver($provider)->redirect();
    }

    /**
     * Obtain the user information
     *
     * @return Response
     */
    public function handleProviderCallback(\App\SocialAccountsService $accountService, $provider)
    {

        try {
            $user = \Socialite::with($provider)->user();
        } catch (\Exception $e) {
            return redirect('/login');
        }

        $authUser = $accountService->findOrCreate(
            $user,
            $provider
        );

        auth()->login($authUser, true);
        Cache::tags('users')->remember(auth()->user()->id . $provider, 1440, function () use ($user, $provider) {
            return [
                'provider' => $provider,
                'token' => $user->token,
                'tokenSecret' => $user->tokenSecret ?? false,
                'refreshToken' => $user->refreshToken ?? false,
                'expiresIn' => $user->expiresIn ?? false
            ];
        });

        return redirect()->to('/home');
    }
}
