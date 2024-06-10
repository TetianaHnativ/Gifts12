<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST['id'];

$img = $_POST['img'];
$name = $_POST['name'];
$price = $_POST['price'];
$phone = $_POST['phone'];
$description = $_POST['description'];
$user = $_POST['user'];

$result = $conn->query("SELECT * FROM ideas WHERE id = '$id'");


if ($result->num_rows > 0) {
    $sql = "UPDATE ideas SET img = '$img', name = '$name', price = $price, phone = '$phone', description = '$description', user = '$user' WHERE id = '$id'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode("editing successful");
    } else {
        echo json_encode("Error: " . $conn->error);
    }
} else {
    echo json_encode("error");
}

$conn->close();