<?php

namespace Database\Seeders;

use App\Models\Barangay;
use App\Models\CashAdvance;
use App\Models\Claimant;
use App\Models\FinancialType;
use App\Models\Patient;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    Role::create(['name' => 'admin']);
    Role::create(['name' => 'user']);

    User::factory()->create([
      'name' => 'Carlos RGL',
      'email' => 'admin@gmail.com',
      'password' => 'admin@gmail.com'

    ]);
    // assign role user to the users
    User::factory(50)->create()->each(function ($user) {
      $user->assignRole('user');
      $user->created_at = fake()->dateTimeBetween('-1 year', 'now');
      $user->save();
    });



    $user = User::find(1);
    $user->assignRole('admin');

    Patient::factory()->count(2000)->create();
    FinancialType::factory()->count(100)->create();
    CashAdvance::factory()->count(10)->create();

    $barangay = array(
      array('id' => '1','barangay' => 'Apil'),
      array('id' => '2','barangay' => 'Binuangan'),
      array('id' => '3','barangay' => 'Bolibol'),
      array('id' => '4','barangay' => 'Buenavista'),
      array('id' => '5','barangay' => 'Bunga'),
      array('id' => '6','barangay' => 'Buntawan'),
      array('id' => '7','barangay' => 'Burgos'),
      array('id' => '8','barangay' => 'Canubay'),
      array('id' => '9','barangay' => 'Ciriaco Pastrano'),
      array('id' => '10','barangay' => 'Clarin Settlement'),
      array('id' => '11','barangay' => 'Dolipos Alto'),
      array('id' => '12','barangay' => 'Dolipos Bajo'),
      array('id' => '13','barangay' => 'Dulapo'),
      array('id' => '15','barangay' => 'Dullan Norte'),
      array('id' => '16','barangay' => 'Dullan Sur'),
      array('id' => '17','barangay' => 'Layawan'),
      array('id' => '18','barangay' => 'Lower Lamac'),
      array('id' => '19','barangay' => 'Lower Langcangan'),
      array('id' => '20','barangay' => 'Lower Loboc'),
      array('id' => '21','barangay' => 'Lower Rizal'),
      array('id' => '22','barangay' => 'Malindang'),
      array('id' => '23','barangay' => 'Mialen'),
      array('id' => '24','barangay' => 'Mobod'),
      array('id' => '25','barangay' => 'Paypayan'),
      array('id' => '26','barangay' => 'Pines'),
      array('id' => '27','barangay' => 'Poblacion I'),
      array('id' => '28','barangay' => 'Poblacion II'),
      array('id' => '29','barangay' => 'Proper Langcangan'),
      array('id' => '30','barangay' => 'San Vicente Alto'),
      array('id' => '31','barangay' => 'San Vicente Bajo'),
      array('id' => '32','barangay' => 'Sebucal'),
      array('id' => '33','barangay' => 'Senote'),
      array('id' => '34','barangay' => 'Taboc Norte'),
      array('id' => '35','barangay' => 'Taboc Sur'),
      array('id' => '36','barangay' => 'Talairon'),
      array('id' => '37','barangay' => 'Talic'),
      array('id' => '38','barangay' => 'Tipan'),
      array('id' => '39','barangay' => 'Toliyok'),
      array('id' => '40','barangay' => 'Tuyabang Alto'),
      array('id' => '41','barangay' => 'Tuyabang Bajo'),
      array('id' => '42','barangay' => 'Tuyabang Proper'),
      array('id' => '43','barangay' => 'Upper Lamac'),
      array('id' => '44','barangay' => 'Upper Langcangan'),
      array('id' => '45','barangay' => 'Upper Loboc'),
      array('id' => '46','barangay' => 'Upper Rizal'),
      array('id' => '47','barangay' => 'Victoria'),
      array('id' => '48','barangay' => 'Villaflor')
    );

    foreach ($barangay as $b) {
      Barangay::create($b);
    }

    Claimant::factory()->count(100)->create();
  }
}
