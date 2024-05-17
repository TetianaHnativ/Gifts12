<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['user'];
$receiver = $_POST['receiver'];
$age = $_POST['age'];
$occasion = $_POST['occasion'];
$interests = $_POST['interests'];


$sql = "INSERT INTO questionnaire (receiver, age, occasion, interests, user) VALUES ('$receiver', '$age', '$occasion', '$interests', '$user')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
