<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$gift = $_POST['gift'];
$user = $_POST['user'];

$idGiftExists = $conn->query("SELECT gift_id FROM basket WHERE gift_id = $gift");


if ($idGiftExists->num_rows > 0) {
    echo "already exists";
} else {
    $result = $conn->query("INSERT INTO basket (gift_id, user) VALUES ($gift, $user)");
    echo $result ? "added" : "Failed to add item to favourites.";
}

$conn->close();