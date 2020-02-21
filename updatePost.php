<?php

include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;
session_start();

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

// var_dump($json_obj);
// var_dump(intval($json_obj->postId));
// var_dump($json_obj->postContent);
$query->updatePost("jokes", "posts", (int)$json_obj->postId, $json_obj->postContent);