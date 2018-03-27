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
                <div class="card-footer text-center">
                    <!-- Login page HTML code  -->

                    <a href="/login/facebook"  class="btn btn-primary btn-md">Log in with Facebook</a>
                    <a href="/login/twitter"  class="btn btn-primary btn-md">Log in with Twitter</a>
                    <a href="/login/instagram"  class="btn btn-primary btn-md">Log in with Instagram</a>

                    <!-- Login page HTML code  -->
                </div>
                <script>
                    user = {!! json_encode($data) !!}
                </script>
            </div>
        </div>
    </div>
</div>
<div id="example"></div>
@endsection
