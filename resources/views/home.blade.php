@extends('layouts.app')

@section('content')
<div class="container">
    <div class="section" id="dashboard">
        <div class="columns">
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-header-title">Dashboard</h4>
                    </div>
                    <div class="card-content">
                        @if (session('status'))
                            <div class="alert alert-success">
                                {{ session('status') }}
                            </div>
                        @endif

                        You are logged in!
                    </div>
                    <div class="card-footer">
                        <!-- Login page HTML code  -->

                        <a href="/login/facebook"  class="card-footer-item">Log in with Facebook</a>
                        <a href="/login/twitter"  class="card-footer-item">Log in with Twitter</a>
                        <a href="/login/instagram"  class="card-footer-item">Log in with Instagram</a>

                        <!-- Login page HTML code  -->
                    </div>
                </div>
            </div>
        </div>
        <div id="home"></div>
    </div>
</div>
@push('scripts')
<script>
    user = {!! json_encode($data) !!}
</script>
<script src="{{ mix('js/Home.js') }}" defer></script>
@endpush
@endsection
