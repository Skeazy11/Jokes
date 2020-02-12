
<?php

require_once '../classes/db.class.php';

class Query extends DB {

    public function insert(string $dbName, string $tableName, array $data) {

        $this->connect($dbName);

        $values = implode("', '", array_values($data));
        $columns = implode(", ", array_keys($data));

        $sql = "INSERT INTO $tableName ($columns) VALUES ('$values');";
        $this->conn->query($sql);

        $this->closeConn();
    }

    public function loginCheck(string $dbName, string $tableName, string $mail) {

        $this->connect($dbName);

        $sql = "SELECT * FROM $tableName WHERE user_email = ?;";

        if($stmt = $this->conn->prepare($sql)) {
            $stmt->bind_param("s", $mail);
            $stmt->execute();
            $result = $stmt->get_result();

            if($result->num_rows > 0){
                $resultsArray = $result->fetch_assoc();
            }
            return $resultsArray;
        }
        else {
            return false;
        }

        $this->closeConn();
    }

    public function signupCheck(string $dbName, string $tableName, $email) {

        $this->connect($dbName);

        $sql = "SELECT * FROM $tableName WHERE user_email = ?";

        if($stmt = $this->conn->prepare($sql)) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if($result->num_rows > 0){
                return true;
            }
            return false;
        }
        else {
            return false;
        }

        $this->closeConn();
    }
}