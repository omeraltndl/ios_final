<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "blogapp");
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

$email = $_POST['email'] ?? "";
$newEmail = $_POST['newEmail'] ?? $email;
$name = $_POST['name'] ?? "";
$surname = $_POST['surname'] ?? "";
$phone = $_POST['phone'] ?? "";

if (empty($email)) {
    echo json_encode(["success" => false, "message" => "Mevcut e-posta eksik."]);
    exit;
}

// Eğer e-posta değiştiyse, çakışma kontrolü
if ($newEmail !== $email) {
    $checkStmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $newEmail);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Bu e-posta başka bir kullanıcı tarafından kullanılıyor."]);
        exit;
    }
    $checkStmt->close();
}

// Profil fotoğrafı işle
$targetDir = "uploads/";
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

if (isset($_FILES['profile_picture'])) {
    $stmt = $conn->prepare("SELECT profile_picture FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $oldPicture = null;

    if ($result->num_rows > 0) {
        $oldPicture = $result->fetch_assoc()['profile_picture'];
    }
    $stmt->close();

    $fileName = uniqid() . "_" . basename($_FILES['profile_picture']['name']);
    $targetFilePath = $targetDir . $fileName;

    if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $targetFilePath)) {
        $stmt = $conn->prepare("UPDATE users SET profile_picture = ? WHERE email = ?");
        $stmt->bind_param("ss", $targetFilePath, $email);
        $stmt->execute();
        $stmt->close();

        if ($oldPicture && file_exists($oldPicture)) unlink($oldPicture);
    }
}

// Kullanıcı bilgilerini güncelle
$stmt = $conn->prepare("UPDATE users SET name = ?, surname = ?, phone = ?, email = ? WHERE email = ?");
$stmt->bind_param("sssss", $name, $surname, $phone, $newEmail, $email);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profil başarıyla güncellendi."]);
} else {
    echo json_encode(["success" => false, "message" => "Profil güncellenirken bir hata oluştu."]);
}

$stmt->close();
$conn->close();
