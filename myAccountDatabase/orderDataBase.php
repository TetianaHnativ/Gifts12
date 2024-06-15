<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$address = $_POST['address'];
$phone = $_POST['phone'];
$price = $_POST['price'];
$packaging = $_POST['packaging'];
$user = $_POST['user'];

$postData = $_POST['gifts'];
$gifts = json_decode($postData, true);

// Встановлення часового поясу
date_default_timezone_set('Europe/Kiev');

$currentDate = date('Y-m-d');

$result = $conn->query("SELECT * FROM users WHERE id=$user");

if ($result->num_rows > 0) {
    $sql = "INSERT INTO orders (address, phone, price, packaging, date, user) 
    VALUES ('$address', '$phone', $price, '$packaging', '$currentDate', $user)";
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;

        foreach ($gifts as $data) {
            $gift = intval($data['id']);
            $number = intval($data['number']);
            $price = floatval($data['price']);

            $sql2 = "INSERT INTO orders_gifts (order_id, gift, number, price) VALUES ($last_id, $gift, $number, $price)";

            if ($conn->query($sql2) !== TRUE) {
                echo json_encode("Error inserting gift data: " . $conn->error);
                break;
            }
        }

        $sql3 = "DELETE FROM basket WHERE user = $user";
        $conn->query($sql3);
        echo json_encode("order successful");
    } else {
        echo json_encode("Error inserting order: " . $conn->error);
    }
} else {
    echo json_encode("Error: " . $conn->error);
}

$conn->close();
