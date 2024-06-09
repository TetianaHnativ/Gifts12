<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['id'];
$oldPassword = $_POST['oldPassword'];

$result = $conn->query("SELECT password FROM users WHERE id = $user");


if ($result->num_rows > 0) {
    $passwordDatabase = $result->fetch_assoc()['password'];
    $hashed_password = hash('sha256', $oldPassword);
    if ($hashed_password === $passwordDatabase) {
        echo json_encode("password right");
    } else {
        echo json_encode("password wrong");
    }
} else {
    $data_array = array("error" => "No records found");
}

$conn->close();