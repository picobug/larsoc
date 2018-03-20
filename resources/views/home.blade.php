@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <!-- Login page HTML code  -->

            <a href="/login/facebook"  class="btn btn-default btn-md">Log in with Facebook</a>
            <a href="/login/twitter"  class="btn btn-default btn-md">Log in with Twitter</a>

            <!-- Login page HTML code  -->
        </div>
    </div>
</div>
@endsection
