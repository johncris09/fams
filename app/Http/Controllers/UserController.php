<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\UserRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\User\UserResource;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;



class UserController extends Controller
{

  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    // $search = $request->input('search');
    // $perPage = $request->input('per_page', 10); // Default to 10 if not specified

    // $users = User::with('roles')
    //   ->when($search, function ($query, $search) {
    //     $query->where(function ($query) use ($search) {
    //       $query->where('name', 'like', "%{$search}%")
    //         ->orWhere('email', 'like', "%{$search}%");
    //     });
    //   });
    //   // ->paginate($perPage);

    // $roles = Role::all()->pluck('name');

    // return Inertia::render(
    //   'Users/Index',
    //   [
    //     'users' => UserResource::collection($users),
    //     'roles' => $roles,
    //     // 'filters' => [
    //     //   'search' => $search,
    //     //   'per_page' => $perPage
    //     // ]
    //   ]
    // );

    Gate::authorize('viewAny', User::class);


    $perPage = $request->input('per_page', 10); // Default to 10 if not specified

    $users = User::with('roles')->orderBy('name', 'asc')->paginate($perPage);

    $roles = Role::all(); //->pluck(value: 'name');
    return Inertia::render(
      'Users/Index',
      [
        'users' => UserResource::collection($users),
        'roles' => $roles,
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
  public function store(UserStoreRequest $request)
  {
    $user = User::create($request->validated());

    if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
      $avatar = $request->file('avatar');
      $avatarName = time() . '.' . $avatar->getClientOriginalExtension();
      $avatar->storeAs('avatars', $avatarName, 'public');
      $user->update(['avatar' => $avatarName]);
    }
    // assign role
    $user->assignRole($request->role);

    return redirect()->route('users.index')
      ->with('success', 'User created successfully!');

  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    Gate::authorize('view', User::class);

  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {

    Gate::authorize('update', User::class);

    // return the user with the specified id
    return Inertia::render(
      'Users/Edit',
      [
        'user_data' => new UserResource(resource: User::find($id)),
      ]
    );
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UserUpdateRequest $request, User $user)
  {

    $user->update(
      $request->validated()
    );


    // Check if the avatar was uploaded
    if ($request->hasFile('avatar') && $request->file('avatar')->isValid()) {
      $user->update([
        'avatar' => $request->file('avatar')->store('users'),
      ]);
      // $avatar = $request->file('avatar');
      // $avatarName = $user->id . '.' . $avatar->getClientOriginalExtension();
      // // Store the avatar in the public storage
      // $avatar->storeAs('avatars', $avatarName, 'public');

      // // Update the user with the new avatar path
      // $user->update(['avatar' => $avatarName]);
    }

    // Validate the request (this will automatically be done via UserRequest)
    // $request->all();

    // Only update if there's any change in the name, email, or role
    // $user->update($request->only('name', 'email', 'role'));


    // Sync the user's roles
    $user->syncRoles($request->role);

    // Return a success response with a redirect
    return redirect()->route('users.index')
      ->with('success', 'User updated successfully!');
  }



  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {

    Gate::authorize('delete', User::class);
    // get the id parameter from the request
    $id = $request->id;

    User::destroy($id);
    // return json with response
    // redirect to route('users.index'); whit message and render inertia page
    // return Redirect::route('users.index', ['message' => 'User deleted successfully']);

    return redirect()->route('users.index')
      ->with('success', 'User deleted successfully!');

  }

  /**
   * Find a user by ID.
   *
   * @param int $id
   * @return \Inertia\Response
   */
  public function findById($id)
  {
    Gate::authorize('view', User::class);
    $user = User::findOrFail($id);
    return Inertia::render('Users/Edit', [
      'user' => new UserResource($user)
    ]);
  }

  public function bulkDestroy(Request $request)
  {
    $request->validate([
      'ids' => 'required|array',
      'ids.*' => 'exists:users,id'
    ]);

    try {
      User::whereIn('id', $request->ids)->delete();

      return redirect()->back()->with('success', 'Users deleted successfully');
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Failed to delete users');
    }
  }
}
