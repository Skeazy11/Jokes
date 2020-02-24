<?php

header("Content-Type:application/json");
include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;

if (!empty($_GET['name']) && $_GET['name'] == 'comments') {
	$comments = $query->getComments();
	$currentUserId = 0;

	if(!empty($comments)) {
		session_start();
		if(isset($_SESSION['userId'])) {
			$currentUserId = $_SESSION['userId'];
		}

		for ($i = 0; $i < count($comments); $i++) { 
			if($comments[$i]['comment_user_id'] == $currentUserId) {
				$comments[$i]['comment_user_id'] = 'owner';
			}
			else {
				$comments[$i]['comment_user_id'] = 'viewer';
			}

			$comments[$i]['user_type'] = $comments[$i]['comment_user_id'];
			unset($comments[$i]['comment_user_id']);
		}

    }
    
    if(empty($comments))
	{
		response(200, "Comments Not Found", NULL);
	}
	else
	{
		response(200, "Success", $comments);
    }
}
else {
	response(400,"Invalid Request", NULL);
}

function response($status, $status_message, $data) {
	header("HTTP/1.1 ".$status);
	
	$response['status']= $status;
	$response['status_message']= $status_message;
	$response['data']= $data;
	
	$json_response = json_encode($response);
	echo $json_response;
}