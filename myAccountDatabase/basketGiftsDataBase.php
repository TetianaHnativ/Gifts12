<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user = $_POST['id'];

$sql = "SELECT basket.*, gifts.*
FROM basket
LEFT JOIN gifts ON gifts.id = basket.gift_id
WHERE basket.user = '$user'";

$result = $conn->query($sql);

$data_array = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data_array[] = $row;
    }
} else {
    echo json_encode("No records found");
}

$conn->close();

echo json_encode($data_array);
