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
        if (Schema::hasColumn('dosen', 'deleted_at')) {
            return;
        }

        Schema::table('dosen', function (Blueprint $table): void {
            $table->softDeletes()->after('verified_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('dosen', 'deleted_at')) {
            return;
        }

        Schema::table('dosen', function (Blueprint $table): void {
            $table->dropSoftDeletes();
        });
    }
};
