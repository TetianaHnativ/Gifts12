<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$surname = $_POST['surname'];
$name = $_POST['username'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = $_POST['password'];


$sql_check_email = "SELECT * FROM users WHERE email='$email'";
$result_check_email = $conn->query($sql_check_email);

if ($result_check_email->num_rows > 0) {
    echo "email is already registered";
} else {
    $hashed_password = hash('sha256', $password);

    $sql = "INSERT INTO users (surname, username, phone, email, password) 
    VALUES ('$surname', '$name', '$phone', '$email', '$hashed_password')";
    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
