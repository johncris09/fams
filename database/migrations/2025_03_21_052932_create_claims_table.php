<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('claimant_id')->constrained()->onDelete('cascade');
            $table->foreignId('financial_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('barangay_id')->constrained()->onDelete('cascade');
            $table->double('amount', 10, 2);
            $table->text('purpose')->nullable();
            $table->date('claim_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
