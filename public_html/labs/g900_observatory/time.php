<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));

$host = $_SERVER['HTTP_HOST'] ?? 'cli';
$https = (
    (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
    (($_SERVER['SERVER_PORT'] ?? '') === '443')
);

if ($host === 'cli') {
    $source = 'local_cli_time_endpoint';
    $certificate_status = 'not_applicable_cli';
} elseif ($https) {
    $source = 'https_origin_time_endpoint';
    $certificate_status = 'browser_validated_tls_origin';
} else {
    $source = 'local_or_http_origin_time_endpoint';
    $certificate_status = 'not_applicable_local_or_http';
}

echo json_encode([
    'schema' => 'g900.viewer.origin_time',
    'version' => '0.1',
    'status' => 'origin_timestamp_live',
    'source' => $source,
    'host' => $host,
    'certificate_status' => $certificate_status,
    'iso_utc' => $now->format(DateTimeInterface::ATOM),
    'unix_ms' => (int) floor(((float) $now->format('U.u')) * 1000),
    'boundary' => [
        'mutates_body' => false,
        'runtime_motion_authority' => false,
        'opens_gates' => false,
        'admits_channels' => false,
        'lights_markers' => false,
        'physics_claim' => false,
        'force_claim' => false
    ],
    'fallback' => [
        'device_time_allowed' => true,
        'fallback_status' => 'device_time_when_origin_unavailable'
    ]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
