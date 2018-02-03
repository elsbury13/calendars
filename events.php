<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include 'connect.php';
require_once 'eventsClass.php';

$events = new Events($pdo);

if ($_POST['update']) {
    $events->update($_POST['title'], $_POST['start'], $_POST['end'], $_POST['id']);
} elseif ($_POST['add']) {
    $events->add($_POST['title'], $_POST['description'], $_POST['start'], $_POST['end'], $_POST['url']);
} elseif ($_GET['getAll']) {
    echo $events->getAll();
} elseif ($_POST['delete']) {
    $events->delete($_POST['id']);
}
