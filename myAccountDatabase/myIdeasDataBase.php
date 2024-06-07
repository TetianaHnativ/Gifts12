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

$sql = "SELECT ideas.*, users.surname, users.username 
        FROM ideas
        LEFT JOIN users ON ideas.user = users.id
        WHERE ideas.user = '$user'";

$result = $conn->query($sql);

$data_array = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Додавання рядка у масив
        $data_array[] = $row;
    }
} else {
    echo "No records found";
}

$conn->close();

// Передача масиву у ваш скрипт
echo json_encode($data_array);
