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
$surname = $_POST['surname'];
$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$newPassword = $_POST['newPassword'];

$result = $conn->query("SELECT id FROM users WHERE id = $user");

$data_array = array();

if ($result->num_rows > 0) {
    $sql = "UPDATE users SET surname = '$surname', username = '$username',
    email = '$email', phone = '$phone' WHERE id = '$user'";

    if (!empty($newPassword)) {
        $hashed_password = hash('sha256', $newPassword);
        $sql2 = "UPDATE users SET password = '$hashed_password' WHERE id = '$user'";
        $conn->query($sql2);
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode("success");
    } else {
        echo json_encode("Error: " . $sql . "<br>" . $conn->error);
    }
} else {
    echo json_encode("No records found");
}

$conn->close();