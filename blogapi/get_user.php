<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "blogapp");

if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed."]);
    exit;
}

// hem POST hem GET destekle
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
} else {
    $email = $_GET['email'] ?? '';
}

if (empty($email)) {
    echo json_encode(["error" => "E-posta adresi gereklidir."]);
    exit;
}

// kullanıcıyı sorgula
$stmt = $conn->prepare("SELECT name, surname, phone, email, profile_picture FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["user" => $user]);
} else {
    echo json_encode(["error" => "Kullanıcı bulunamadı."]);
}

$stmt->close();
$conn->close();
?>
