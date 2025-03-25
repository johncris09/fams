<?php

namespace App\Policies;

use App\Models\CashAdvance;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CashAdvancePolicy
{
  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(User $user): bool
  {
    return $user->hasPermissionTo('cash-advance-list');
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(User $user): bool
  {
    return $user->hasPermissionTo('cash-advance-list');
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return $user->hasPermissionTo('cash-advance-create');
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user): bool
  {
    return $user->hasPermissionTo('cash-advance-edit');
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user): bool
  {
    return $user->hasPermissionTo('cash-advance-delete');
  }

}
