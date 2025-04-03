<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class RoleController extends Controller
{
  /**
   * Display a listing of the resource.
   */

  public function index(Request $request)
  {

    Gate::authorize('viewAny', Role::class);
    $permissions = Permission::all();

    $perPage = $request->input('per_page', 10); // Default to 10 if not specified


    $roles = Role::with('permissions')->orderBy('id', 'desc')->paginate($perPage);

    return Inertia::render(
      'Role/Index',
      [
        'roles' => RoleResource::collection($roles),
        'permissions' => $permissions,
        'filters' => [
          'per_page' => $perPage
        ]
      ]
    );
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {

    $request->validate([
      'name' => 'required',
    ]);


    $role = Role::create([
      'name' => $request->name,
      'guard_name' => 'web',
    ]);
    $role->syncPermissions($request->permissions);

    return redirect()->route('roles.index')
      ->with('success', 'Role created successfully!');

  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {

    $request->validate([
      'name' => 'required',
    ]);
    $role = Role::find($id);
    $role->name = $request->name;
    $role->guard_name = 'web';
    $role->save();


    $role->syncPermissions($request->permissions);

    return redirect()->route('roles.index')
      ->with('success', 'Role updated successfully!');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    // get the id parameter from the request
    $id = $request->id;

    Role::destroy($id);
    return redirect()->route('roles.index', ['message' => 'Role deleted successfully']);

  }
}
