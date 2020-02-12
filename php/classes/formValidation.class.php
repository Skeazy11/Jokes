<?php

class FormValidation {

    public function verifyUserName($userName) {
        if(!preg_match("/^[a-zA-Z0-9]*$/", $userName)) {
            return false;
        }
        else {
            return true;
        }
    }

    public function verifyMail($mail) {
        if(!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        else {
            return true;
        }
    }

    public function verifyEmpty(array $values) {
        foreach ($values as $value) {
            if(empty($value)) {
                return false;
            }
        }

        return true;
    }
}