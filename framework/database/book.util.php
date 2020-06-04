<?php
    require 'MysqlUtil.class.php';


    /**
     * get all books from database into an array, returns false if query failure.
     * @param MysqlUtil $manager
     * @return array|bool
     */
    function getBooks(MysqlUtil $manager) {
        return $manager->query('book');
    }

    echo json_encode(getBooks(new MysqlUtil()));