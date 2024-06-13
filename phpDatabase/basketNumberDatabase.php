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

$sql = "SELECT COUNT(*) as total_rows FROM basket WHERE user = '$user'";
$result = $conn->query($sql);


if ($result) {
    $row = $result->fetch_assoc();
    echo $row['total_rows'];
} else {
    echo "";
}

$conn->close();
