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
$name = $_POST['name'];

if ($name === "favourite gift") {
    $sql = "DELETE FROM favourites WHERE gift_id = $id";
} elseif ($name === "basket gift") {
    $sql = "DELETE FROM basket WHERE gift_id = $id";
} elseif ($name === "favourite idea") {
    $sql = "DELETE FROM favourites WHERE idea_id = $id";
} elseif ($name === "my idea") {
    $sql1 = "DELETE FROM favourites WHERE idea_id = $id";
    $sql2 = "DELETE FROM ideas WHERE id = $id";
} else {
    echo json_encode("error");
    exit;
}


if (isset($sql)) {
    if ($conn->query($sql) === TRUE) {
        echo json_encode("deletion successful");
    } else {
        echo json_encode("Error deleting record: " . $conn->error);
    }
}

if (isset($sql1) && isset($sql2)) {
    if ($conn->query($sql1) === TRUE && $conn->query($sql2) === TRUE) {
        echo json_encode("deletion successful");
    } else {
        echo json_encode("Error deleting record: " . $conn->error);
    }
}

$conn->close();