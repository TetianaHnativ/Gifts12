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
    $isEmailExist = $conn->query("SELECT * FROM users WHERE email = '$email' AND id <> $user");

    if ($isEmailExist->num_rows > 0) {
        $sqlEmail = $conn->query("SELECT email FROM users WHERE id = $user");
        if ($sqlEmail->num_rows > 0) {
            $row = $sqlEmail->fetch_assoc();
            $email = $row['email'];
        }
    }

    $sql = "UPDATE users SET surname = '$surname', username = '$username',
    email = '$email', phone = '$phone' WHERE id = '$user'";

    if (!empty($newPassword)) {
        $hashed_password = hash('sha256', $newPassword);
        $sql2 = "UPDATE users SET password = '$hashed_password' WHERE id = '$user'";
        $conn->query($sql2);
    }

    if ($conn->query($sql) === TRUE && $isEmailExist->num_rows > 0) {
        echo json_encode("success and email");
    } else if ($conn->query($sql) === TRUE) {
        echo json_encode("success");
    } else {
        echo json_encode("Error: " . $sql . "<br>" . $conn->error);
    }
} else {
    $data_array = array("error" => "No records found");
}

$conn->close();
