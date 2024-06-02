<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];


$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row["blocking"]) {
        echo "blocking";
    } else if (hash('sha256', $password) === $row["password"]) {
        $user_id = $row['id'];
        echo "login successful,$user_id";
    } else {
        echo "wrong";
    }
} else {
    echo "user isn't registered";
}

$conn->close();
