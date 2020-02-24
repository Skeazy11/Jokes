<?php

include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;
session_start();

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

date_default_timezone_set("Europe/Bucharest");

$query->insert('jokes', 'comments', 
                array (
                    "comment_user_id" => $_SESSION['userId'],
                    "comment_post_id" => (int)$json_obj->postId,
                    "date_created" => time(),
                    "comment_content" => $json_obj->commentContent
                ));