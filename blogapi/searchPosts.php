<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "blogapp");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Veritabanı bağlantısı başarısız."]);
    exit;
}

$query = $_GET['q'] ?? '';

if (empty($query)) {
    echo json_encode(["success" => false, "message" => "Arama sorgusu gereklidir."]);
    exit;
}

$sql = "SELECT id, title, user_email, picture, created_at FROM posts WHERE title LIKE ?";
$likeQuery = "%" . $query . "%";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $likeQuery);
$stmt->execute();
$result = $stmt->get_result();

$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

echo json_encode(["success" => true, "posts" => $posts]);

$stmt->close();
$conn->close();
?>
