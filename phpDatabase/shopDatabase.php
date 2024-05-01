<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM gifts";
$result = $conn->query($sql);

$data_array = array();

if ($result->num_rows > 0) {
    // Вибірка даних рядок за рядком
    while($row = $result->fetch_assoc()) {
        // Додавання рядка у масив
        $data_array[] = $row;
    }
} else {
    echo "0 results";
}

$conn->close();

// Передача масиву у ваш скрипт
echo json_encode($data_array);
?>
