<?php

include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;
session_start();

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

echo $json_obj->postContent;

date_default_timezone_set("Europe/Bucharest");

$query->insert('jokes', 'posts', 
                array
                (
                    "post_user_id" => $_SESSION['userId'], 
                    "date_created" => time(),
                    "post_content" => $json_obj->postContent
                ));