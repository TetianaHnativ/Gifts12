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
$idea = $_POST['idea'];
$user = $_POST['user'];

$idIdeaExists = $conn->query("SELECT idea_id FROM favourites WHERE idea_id = $idea AND user = $user");


if ($idIdeaExists->num_rows > 0) {
    echo "already exists";
} else {
    $result = $conn->query("INSERT INTO favourites (name, idea_id, user) VALUES ('$name', $idea, $user)");
    echo $result ? "added" : "Failed to add item to favourites.";
}

$conn->close();