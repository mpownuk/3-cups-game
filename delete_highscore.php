<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Credentials: true");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "3cups_db";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection error! " . $conn->connect_error]));
}
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    die(json_encode(["success" => false, "message" => "Invalid request method"]));
}


$data = json_decode(file_get_contents("php://input"));

if (isset($data->gracz)) {
    $gracz = $conn->real_escape_string($data->gracz);

    $sql = "DELETE FROM wyniki WHERE gracz = '$gracz'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Score deleted!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
}

$conn->close();
?>
