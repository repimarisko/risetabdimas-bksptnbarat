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
        Schema::table('pt_penelitian', function (Blueprint $table): void {
            $table->string('proposal_path')->nullable()->after('target_luaran');
            $table->string('proposal_filename')->nullable()->after('proposal_path');
            $table->string('lampiran_path')->nullable()->after('proposal_filename');
            $table->string('lampiran_filename')->nullable()->after('lampiran_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table): void {
            $table->dropColumn([
                'proposal_path',
                'proposal_filename',
                'lampiran_path',
                'lampiran_filename',
            ]);
        });
    }
};

