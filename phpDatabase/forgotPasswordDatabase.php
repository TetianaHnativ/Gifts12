<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$number = $_POST['numberConfirmation'];
$password = $_POST['password'];
$passwordConfirmation = $_POST['passwordConfirmation'];

$action = $_POST['action'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($action === 'sendEmail') {
        $randomNumber = rand(100000, 999999);
        $_SESSION['randomNumber'] = (string) $randomNumber;

        // Відправка електронного листа з випадковим числом
        $subject = "FavouriteGift: випадкове число";
        $message = "Ваше випадкове число: $randomNumber";
        $headers = "From: $email\r\n";
        $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
        //mail($email, $subject, $message, $headers);

        if (mail($email, $subject, $message, $headers)) {
            //echo "";
            echo $_SESSION['randomNumber'];
        } else {
            echo "Помилка при відправці електронного листа";
        }
    }

    if ($action === 'numberChecking') {
        if (isset($_SESSION['randomNumber'])) {
            $randomNumber = $_SESSION['randomNumber'];
            if ($randomNumber ===  $number) {
                if ($password && $passwordConfirmation && $passwordConfirmation === $password) {
                    echo "successful";
                } else {
                    echo "passwords wrong";
                }
            } else {
                echo "only email is right";
            }
        } else {
            echo "Випадкове число не знайдено";
        }
    }

    if ($action === 'passwordChecking') {
        if ($password && $passwordConfirmation && $passwordConfirmation === $password) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $update_sql = "UPDATE users SET password='$hashed_password' WHERE email='$email'";
            if ($conn->query($update_sql) === TRUE) {
                echo "successful";
            } else {
                echo "Помилка при оновленні паролю: " . $conn->error;
            }
        } else {
            echo "passwords wrong";
        }
    }
} else {
    echo "wrong email";
}

$conn->close();
