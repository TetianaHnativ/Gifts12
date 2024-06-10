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

$sql = $conn->query("SELECT * FROM ideas WHERE id = '$id'");

$data_array = array();

if ($sql->num_rows > 0) {
    while ($row = $sql->fetch_assoc()) {
        $data_array[] = $row;
    }
} else {
    $data_array = array("error" => "No records found");
}

$conn->close();

echo json_encode($data_array);
