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

$sql = "SELECT favourites.id, favourites.name, favourites.idea_id, favourites.user, ideas.*
FROM favourites
LEFT JOIN ideas ON ideas.id = favourites.idea_id
WHERE favourites.name = 'idea' AND favourites.user = '$user'";

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
