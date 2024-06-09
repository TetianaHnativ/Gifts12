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

$sql = "SELECT favourites.id, favourites.name, favourites.gift_id, favourites.user, gifts.*
FROM favourites
LEFT JOIN gifts ON gifts.id = favourites.gift_id
WHERE favourites.name = 'gift' AND favourites.user = '$user'";

$result = $conn->query($sql);

$data_array = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data_array[] = $row;
    }
} else {
    $data_array = array("error" => "No records found");
}

$conn->close();

echo json_encode($data_array);
