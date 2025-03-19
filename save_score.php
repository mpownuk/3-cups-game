<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "3cups_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error){
    die("connection error! " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->gracz) && isset($data->wynik)) {
    $gracz = $conn->real_escape_string($data->gracz);
    $wynik = intval($data->wynik);

    $sql = "INSERT INTO wyniki (gracz, wynik) VALUES ('$gracz', '$wynik')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Score saved!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
}

$conn->close();
?>