<?php

include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;
session_start();

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

$query->deletePost("jokes", "posts", (int)$json_obj->postId);