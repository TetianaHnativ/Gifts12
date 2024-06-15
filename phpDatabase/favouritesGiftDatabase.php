<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$gift = $_POST['gift'];
$user = $_POST['user'];

$idGiftExists = $conn->query("SELECT gift_id FROM favourites WHERE gift_id = $gift AND user = $user");


if ($idGiftExists->num_rows > 0) {
    echo "already exists";
} else {
    $result = $conn->query("INSERT INTO favourites (name, gift_id, user) VALUES ('$name', $gift, $user)");
    echo $result ? "added" : "Failed to add item to favourites.";
}

$conn->close();