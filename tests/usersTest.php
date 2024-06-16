<?php
ob_start();

include '../phpDatabase/usersDatabase.php';

$json_data = ob_get_clean();

$data_array = json_decode($json_data, true);

if (!empty($data_array)) {
    echo "Data received successfully!<br>";
    foreach ($data_array as $item) {
        echo "<br>";
        foreach ($item as $key => $value) {
            echo $key . ": " . $value . "<br>";
        }
    }
} else {
    echo "No results found!\n";
}
