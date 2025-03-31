<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('claimants', function (Blueprint $table) {
      $table->id();
      $table->string('first_name');
      $table->string('middle_name')->nullable();
      $table->string('last_name');
      $table->string('suffix')->nullable();
      $table->date('birthdate');
      $table->enum('gender', ['Male', 'Female', 'other']);
      $table->enum('marital_status', ['Single', 'Married', 'Divorced', 'Widowed']);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('claimants');
  }
};
