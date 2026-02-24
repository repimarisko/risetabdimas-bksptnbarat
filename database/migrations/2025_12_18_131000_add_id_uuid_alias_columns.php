<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Be flexible with tables that were renamed from `uuid` to `id` (UUID type) or vice versa.
        foreach ([
            'pt_penelitian',
            'ref_skema',
            'ref_fokus',
            'ref_sdg',
            'ref_tkt',
            'ref_perguruan_tinggi',
            'dosen',
        ] as $table) {
            $this->ensureIdAndUuidColumns($table);
        }
    }

    private function ensureIdAndUuidColumns(string $table): void
    {
        // If only `uuid` exists, add `id` (UUID) and backfill from `uuid`
        if (Schema::hasTable($table) && Schema::hasColumn($table, 'uuid') && ! Schema::hasColumn($table, 'id')) {
            Schema::table($table, function (Blueprint $tableBlueprint): void {
                $tableBlueprint->string('id', 100)->nullable()->after('uuid')->index();
            });

            DB::table($table)->update(['id' => DB::raw('uuid')]);
        }

        // If only `id` exists, add `uuid` (UUID) and backfill from `id`
        if (Schema::hasTable($table) && Schema::hasColumn($table, 'id') && ! Schema::hasColumn($table, 'uuid')) {
            Schema::table($table, function (Blueprint $tableBlueprint): void {
                $tableBlueprint->string('uuid', 100)->nullable()->after('id')->index();
            });

            DB::table($table)->update(['uuid' => DB::raw('id')]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Intentionally left empty to avoid data loss; rollback will keep alias columns.
    }
};
