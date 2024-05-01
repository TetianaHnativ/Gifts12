<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $randomNumber = rand(100000, 999999);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    if (password_verify($password, $hashed_password)) {
        echo $randomNumber;
    } else {
        echo $randomNumber;
    }
} else {
    echo "email isn't registered";
}

$conn->close();