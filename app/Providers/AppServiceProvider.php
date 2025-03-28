<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
class AppServiceProvider extends ServiceProvider
{


  /**
   * Register any application services.
   */
  public function register(): void
  {
  }

  /**
   * Bootstrap any application services.
   */
  public function boot(): void
  {
    Vite::prefetch(concurrency: 3);

    // Implicitly grant "Super Admin" role all permissions
    // This works in the app by using gate-related functions like auth()->user->can() and @can()
    Gate::before(function ($user, $ability) {
      return $user->hasRole('Super Admin') ? true : null;
    });

    Gate::after(function ($user, $ability) {
      return $user->hasRole('Super Admin'); // note this returns boolean
    });

    // Share flash messages globally in Inertia
    Inertia::share([
      'appName' => config('app.name'),
      'projectFullName' => config('app.project_full_name'),
      'flash' => function () {
        return [
          'success' => session('success'),
          'error' => session('error'), // You can add error messages too
        ];
      },
    ]);
  }
}
