<?php
include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;
$posts = $query->getPosts();
$currentUserId = 0;

if(!empty($posts)) {
    session_start();
    if(isset($_SESSION['userId'])) {
        $currentUserId = $_SESSION['userId'];
    }

    for ($i = 0; $i < count($posts); $i++) { 
        if($posts[$i]['post_user_id'] == $currentUserId) {
            $posts[$i]['post_user_id'] = 'owner';
        }
        else {
            $posts[$i]['post_user_id'] = 'viewer';
        }
    }
}