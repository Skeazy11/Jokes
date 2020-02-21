
<?php

require_once $_SERVER['DOCUMENT_ROOT']. '/Jokes/php/classes/db.class.php';

class Query extends DB {

    public function insert(string $dbName, string $tableName, array $data) {

        $this->connect($dbName);

        $values = implode("', '", array_values($data));
        $columns = implode(", ", array_keys($data));

        $sql = "INSERT INTO $tableName ($columns) VALUES ('$values');";
        $this->conn->query($sql);

        $this->closeConn();
    }

    public function updatePost(string $dbName, string $tableName, int $id, string $newContent) {

        $this->connect($dbName);

        $sql = "UPDATE $tableName SET post_content = '$newContent' WHERE post_id = $id;";
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

    public function getPosts() {
        $this->connect('jokes');

        $posts = array();

        $sql = "SELECT users.user_name, post_user_id, post_id, post_content, date_created FROM posts INNER JOIN users ON users.user_id = posts.post_user_id";
        if ($result = $this->conn->query($sql)) {
            while ($row = mysqli_fetch_assoc($result)) {
                array_push($posts, $row);
            }
            return $posts;

        }
        else {
            return false;
        }

        $this->closeConn();
    }
}