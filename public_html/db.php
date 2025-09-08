<?php
// Database connection (hardened)
// Prefer environment variables if set; fall back to defaults below
$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_USER = getenv('DB_USER') ?: 'u466943558_physio_user';
$DB_PASS = getenv('DB_PASS') ?: '13466777';
$DB_NAME = getenv('DB_NAME') ?: 'u466943558_physio_app';

// Do not expose detailed errors to clients
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Ensure mysqli does not emit warnings/notices directly
mysqli_report(MYSQLI_REPORT_OFF);

/**
 * Send a safe JSON 500 response and exit
 */
function respond_db_error() {
    if (!headers_sent()) {
        header('Content-Type: application/json');
        http_response_code(500);
    }
    echo json_encode(['success' => false, 'error' => 'Database connection error']);
    exit;
}

$conn = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn === false || $conn->connect_errno) {
    respond_db_error();
}
if (!$conn->set_charset('utf8mb4')) {
    // Charset is important; treat failure as connection error for safety
    respond_db_error();
}
?>


