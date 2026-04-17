<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Services\LifecycleArchiver;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('lifecycle:archive {--archive-after=30} {--purge-after=365}', function (
    LifecycleArchiver $archiver
): void {
    $archiveAfter = max(1, (int) $this->option('archive-after'));
    $purgeAfter = max(1, (int) $this->option('purge-after'));

    $summary = $archiver->run($archiveAfter, $purgeAfter);

    $this->info('Lifecycle archive run complete.');
    $this->line('- Users: archived ' . $summary['users']['archived'] . ', purged ' . $summary['users']['purged']);
    $this->line('- Pt Penelitian: archived ' . $summary['pt_penelitian']['archived'] . ', purged ' . $summary['pt_penelitian']['purged']);
})->purpose('Archive soft-deleted records and purge old archives');
