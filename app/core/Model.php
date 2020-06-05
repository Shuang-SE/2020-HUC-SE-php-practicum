<?php


    namespace app\core;
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/core/Config.php';

    use PDO;

    abstract class Model {

        public function getDB() {
            static $db = null;

            if ($db === null) {
                $dsn = 'mysql:host=' . Config::DB_HOST . ';dbname=' . Config::DB_NAME . ';charset=utf8';
                $usr = Config::DB_USER;
                $pwd = Config::DB_PASSWORD;
                $db = new PDO($dsn, $usr, $pwd);
            }

            return $db;
        }
    }