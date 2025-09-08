<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/db.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Minimal fields; adjust to your patient form
$required = ['fullName','mobile','email','city'];
foreach ($required as $key) {
    if (!isset($data[$key]) || $data[$key] === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing field: ' . $key]);
        exit;
    }
}

try {
    $stmt = $conn->prepare('INSERT INTO patients (full_name, mobile, email, city, created_at) VALUES (?,?,?,?,NOW())');
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $fullName = $data['fullName'];
    $mobile = $data['mobile'];
    $email = $data['email'];
    $city = $data['city'];

    $stmt->bind_param('ssss', $fullName, $mobile, $email, $city);
    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }
    $stmt->close();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}


