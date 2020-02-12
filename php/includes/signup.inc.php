<?php

if (isset($_POST['signup-submit'])) {

    include "../includes/autoloader.inc.php";

    //Get the values enter in the sing-up form
    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $passwordConfirm = $_POST['confirmPassword'];

    $form = new FormValidation;
    $query = new Query;

    if(!$form->verifyEmpty([$username, $email, $password, $passwordConfirm])) {
        header('Location: ../../signup.html?error=emptyfields&uid='.$username.'&mail='.$email);
    }
    else if(!$form->verifyMail($email)) {
        header('Location: ../../signup.html?error=invalidemail&uid='.$username);
    }
    else if(!$form->verifyUserName($username)) {
        header('Location: ../../signup.html?error=invalidusername&mail='.$email);
    }
    else if ($password !== $passwordConfirm)
    {
        header('Location: ../../signup.html?error=passwordcheck&uid='.$username.'&mail='.$email);
    }
    else if($query->signupCheck("jokes", "users", $email)) {
        header('Location: ../../signup.html?error=emailinuse');        
    }
    else {
        $query->insert("jokes", "users", array ("user_name" => $username, "user_email" => $email, "user_password" => PasswordHash::hashPassword($password)));
        header('Location: ../../');
        exit();
    }
}