<?php

class DB {

    protected $serverName;
    protected $userName;
    protected $password;
    protected $dbName;

    protected $conn;

    protected function connect($db) {
        $this->serverName = "localhost";
        $this->userName = "root";
        $this->password = "";
        $this->dbName = $db;


        $this->conn = new mysqli($this->serverName, $this->userName, $this->password, $this->dbName);
        
        if($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    protected function closeConn() {
        $this->conn->close();
    }


}

