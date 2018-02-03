<?php
session_start();
ob_start();

    $hostname = "192.168.20.62";
    $database = "calendar";
    $username = "root";
    $password = "";

// Set up PDO connection
$connnection = sprintf(
    'mysql:host=%s;dbname=%s;',
    $hostname,
    $database
);
$pdo = new PDO($connnection, $username, $password);

if ($pdo == false) {
    echo "Calendar is currently under maintenance";
}

$pdo->exec("set names utf8");
