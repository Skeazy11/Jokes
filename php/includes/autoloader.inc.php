<?php

spl_autoload_register('autoLoader');

function autoLoader($className) {
    $path = $_SERVER['DOCUMENT_ROOT'] . "/Jokes/php/classes/";
    $extension = ".class.php";
    $fullPath = $path . $className . $extension;

    if(!file_exists($fullPath)) {
        return false;
    }

    include_once $fullPath;
}