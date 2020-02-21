<?php
header("Content-Type:application/json");
include $_SERVER['DOCUMENT_ROOT'] . '/Jokes/php/includes/autoloader.inc.php';

$query = new Query;

if (!empty($_GET['name']) && $_GET['name'] == 'get') {
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

			$posts[$i]['user_type'] = $posts[$i]['post_user_id'];
			unset($posts[$i]['post_user_id']);
		}

	}

	if(empty($posts))
	{
		response(200, "Posts Not Found", NULL);
	}
	else
	{
		response(200, "Success", $posts);
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