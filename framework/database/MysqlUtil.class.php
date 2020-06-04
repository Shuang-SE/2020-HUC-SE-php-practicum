<?php

    class MysqlUtil {
        private PDO $PDO;
        private string $DSN;

        public function __construct($dsn = 'mysql:host=localhost;dbname=php_practicum', $username = 'root', $password = 'root', $options = null) {
            $this->DSN = $dsn;
            $this->PDO = new PDO($this->DSN, $username, $password, $options);
        }

        /**
         * @return PDO
         */
        public function getPDO(): PDO {
            return $this->PDO;
        }

        public function query(string $table_name, array $parameters = []) {
            $sql = "select * from $table_name where 1 = 1";
            foreach ($parameters as $key => $value) {
                $sql .= " and $key = '$value'";
            }
            $stmt = $this->PDO->prepare($sql);
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            return false;
        }

    }