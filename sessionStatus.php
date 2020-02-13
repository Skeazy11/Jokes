<?php

session_start();
$data = array();

if(isset($_SESSION['userName'])) {
    $data['userLogged'] = true;
}
else {
    $data['userLogged'] = false;
}

echo json_encode($data);