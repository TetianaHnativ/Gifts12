<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$img = $_POST['img'];
$name = $_POST['name'];
$price = $_POST['price'];
$phone = $_POST['phone'];
$description = $_POST['description'];
$author = $_POST['author'];

$sql_check = "SELECT * FROM users WHERE id=$author";
$result_check = $conn->query($sql_check);

if ($result_check->num_rows > 0) {
    $sql = "INSERT INTO ideas (img, name, price, phone, description, user) 
    VALUES ('$img', '$name', $price, '$phone', '$description', $author)";
    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "wrong";
}

$conn->close();
