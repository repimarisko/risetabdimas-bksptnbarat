<?php

declare(strict_types=1);

$adminerBootstrap = dirname(__DIR__) . '/adminer-5.4.2.php';

if (!is_file($adminerBootstrap)) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Adminer bootstrap file not found.';
    exit;
}

require $adminerBootstrap;
