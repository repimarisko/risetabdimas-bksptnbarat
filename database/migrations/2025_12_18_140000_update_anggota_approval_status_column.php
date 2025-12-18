<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('pt_penelitian_anggota_approvals')) {
            return;
        }

        // Switch enum to string so we can store "rejected" in addition to pending/approved.
        DB::statement("ALTER TABLE pt_penelitian_anggota_approvals MODIFY status VARCHAR(20) DEFAULT 'pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasTable('pt_penelitian_anggota_approvals')) {
            return;
        }

        // Revert to pending-only default enum-like constraint; keep existing values as-is.
        DB::statement("ALTER TABLE pt_penelitian_anggota_approvals MODIFY status VARCHAR(20) DEFAULT 'pending'");
    }
};
