<?php

if (isset($_POST["login-submit"])) {

    include $_SERVER['DOCUMENT_ROOT'] . "/Jokes/php/includes/autoloader.inc.php";

    $mail = $_POST['email'];
    $password = $_POST['password'];

    $form = new FormValidation;
    $query = new Query;

    
    if(!$form->verifyEmpty([$mail, $password])){
        header('Location: ../../login.html?error=emptyfields');
    }
    else if (!$form->verifyMail($mail)){
        header('Location: ../../login.html?error=invalidemail');
    }
    else {
        $userInformation = $query->loginCheck("jokes", "users", $mail);

        if($userInformation != false) {
            if(password_verify($password, substr($userInformation['user_password'], 0, -1))){
                session_start();
                $_SESSION['userId'] = $userInformation['user_id'];
                $_SESSION['userName'] = $userInformation['user_name'];

                header('Location: ../../');
                exit();
            }
        }
        else {
            header('Location: ../../login.html?error=loginfail');
            exit();
        }
    }
}