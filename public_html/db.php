<?php
// Database connection
$DB_HOST = "localhost";
$DB_USER = "u466943558_physio_user"; // your DB user
$DB_PASS = "13466777";               // your DB password
$DB_NAME = "u466943558_physio_app";  // your DB name

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($conn->connect_error) {
    http_response_code(500);
    die("DB Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>


