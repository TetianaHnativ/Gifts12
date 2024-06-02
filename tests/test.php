<?php
$servername = "localhost";
$username = "root";
$password = "secret";
$dbname = "gifts";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

mysqli_set_charset($conn, "utf8mb4");

function test_mysqli_query($test_data)
{
    global $data_array;
    $data_array = $test_data;
}

$testCases = [
    [
        'expected' => '[{"id":1,"name":"Подарунок 1","price":10},{"id":2,"name":"Подарунок 2","price":20}]',
        'description' => 'Перевірка, що функція правильно обробляє дані для JSON',
        'test_data' => [
            ['id' => 1, 'name' => 'Подарунок 1', 'price' => 10],
            ['id' => 2, 'name' => 'Подарунок 2', 'price' => 20],
        ]
    ],
    [
        'expected' => '[]',
        'description' => 'Перевірка, що функція правильно поводиться, коли немає даних',
        'test_data' => [] // No data for this test case
    ],
    [
        'expected' => '[{"id":1,"name":"Подарунок 1","price":10},{"id":2,"name":"Cup with блюдцем","price":20}]',
        'description' => 'Перевірка, що функція вірно обробляє дані з різними символами',
        'test_data' => [ // Custom data for this test case
            ['id' => 1, 'name' => 'Подарунок 1', 'price' => 10],
            ['id' => 2, 'name' => 'Cup with блюдцем', 'price' => 20],
        ]
    ]
];



// Запустіть тести
foreach ($testCases as $index => $testCase) {
    $index = $index + 1;
    ob_start();
    test_mysqli_query($testCase['test_data']); 
    echo json_encode($data_array, JSON_UNESCAPED_UNICODE); 
    $actualOutput = ob_get_clean();

    if ($actualOutput === $testCase['expected']) {
        echo 'Тест ' . $index . ' успішний: ' . $testCase['description'] . "<br>";

    } else {
        echo "Тест $index не пройдено: " . $testCase['description'] . "<br>";
        echo "Очікувано: " . $testCase['expected'] . "<br>";
        echo "Фактично: " . $actualOutput . "<br>";

    }
}

// Закриття з'єднання з базою даних
$conn->close();

