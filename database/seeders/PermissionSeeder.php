<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $permissions = [
      'patient-list',
      'patient-create',
      'patient-edit',
      'patient-delete',
      'claimant-list',
      'claimant-create',
      'claimant-edit',
      'claimant-delete',
      'financial-type-list',
      'financial-type-create',
      'financial-type-edit',
      'financial-type-delete',
      'cash-advance-list',
      'cash-advance-create',
      'cash-advance-edit',
      'cash-advance-delete',
      'claim-list',
      'claim-create',
      'claim-edit',
      'claim-delete',
      'user-list',
      'user-create',
      'user-edit',
      'user-delete',
      'role-list',
      'role-create',
      'role-edit',
      'role-delete',

    ];
    foreach($permissions as $key =>  $permission){
      Permission::create([
        'name' => $permission,
      ]);
    }
  }
}
