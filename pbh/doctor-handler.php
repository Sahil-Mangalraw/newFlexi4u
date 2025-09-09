<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/db.php';

// Validate required fields
$required = ['fullName','mobile','email','city','specialization','ndaAccepted'];
foreach ($required as $key) {
    if (!isset($_POST[$key]) || $_POST[$key] === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing field: ' . $key]);
        exit;
    }
}

// File validations
$allowedDocExt = ['pdf','jpg','jpeg','png'];
$allowedImgExt = ['jpg','jpeg','png','gif','webp'];

function save_upload($fileKey, $targetDir, $allowedExt, $maxBytes = 10 * 1024 * 1024) {
    if (!isset($_FILES[$fileKey]) || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Missing or invalid file: ' . $fileKey);
    }
    $file = $_FILES[$fileKey];
    if ($file['size'] > $maxBytes) {
        throw new Exception('File too large: ' . $fileKey);
    }
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowedExt, true)) {
        throw new Exception('Invalid file type for ' . $fileKey);
    }
    if (!is_dir($targetDir)) {
        if (!mkdir($targetDir, 0755, true)) {
            throw new Exception('Cannot create upload directory: ' . $targetDir);
        }
    }
    $safeName = bin2hex(random_bytes(8)) . '_' . preg_replace('/[^A-Za-z0-9_\.-]/', '_', $file['name']);
    $dest = rtrim($targetDir, '/\\') . DIRECTORY_SEPARATOR . $safeName;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        throw new Exception('Failed to move uploaded file: ' . $fileKey);
    }
    return $dest;
}

try {
    $uploadsBase = __DIR__ . '/uploads';
    $photoPath   = save_upload('photo',   $uploadsBase . '/photo',  $allowedImgExt);
    $aadhaarPath = save_upload('aadhaar', $uploadsBase . '/aadhaar',$allowedDocExt);
    $degreePath  = save_upload('degree',  $uploadsBase . '/degree', $allowedDocExt);

    $stmt = $conn->prepare('INSERT INTO doctors (full_name, mobile, email, city, specialization, nda_accepted, photo_path, aadhaar_path, degree_path, created_at) VALUES (?,?,?,?,?,?,?,?,?,NOW())');
    if (!$stmt) {
        throw new Exception('Prepare failed: ' . $conn->error);
    }

    $fullName = $_POST['fullName'];
    $mobile = $_POST['mobile'];
    $email = $_POST['email'];
    $city = $_POST['city'];
    $specialization = $_POST['specialization'];
    $ndaAccepted = isset($_POST['ndaAccepted']) && ($_POST['ndaAccepted'] === 'true' || $_POST['ndaAccepted'] === '1' || $_POST['ndaAccepted'] === 'on') ? 1 : 0;

    $stmt->bind_param('sssssiiss', $fullName, $mobile, $email, $city, $specialization, $ndaAccepted, $photoPath, $aadhaarPath, $degreePath);
    if (!$stmt->execute()) {
        throw new Exception('Execute failed: ' . $stmt->error);
    }
    $stmt->close();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}


