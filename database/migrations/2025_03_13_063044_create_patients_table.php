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
    Schema::create('patients', function (Blueprint $table) {
      $table->id();
      $table->string('first_name');
      $table->string('middle_name')->nullable(); // Optional
      $table->string('last_name');
      $table->string('suffix')->nullable(); // Optional (e.g., Jr., Sr., III)
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('patients');
  }
};
