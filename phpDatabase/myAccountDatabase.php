<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$gifts = $_POST['gifts'];
$shop = $_POST['shop'];


function checkIds($conn, $idString)
{
    $idArray = explode(",", $idString);

    $existingIds = array();
    foreach ($idArray as $id) {
        $sanitizedId = $conn->real_escape_string($id);

        $sql = "SELECT * FROM gifts WHERE id = $sanitizedId";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $existingIds[] = $id;
        }
    }
    $existingIdsString = implode(",", $existingIds);

    return $existingIdsString;
}

$newGifts = checkIds($conn, $gifts);
$newShop = checkIds($conn, $shop);


echo json_encode(array('newGifts' => $newGifts, 'newShop' => $newShop));

$conn->close();
