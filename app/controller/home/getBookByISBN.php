<?php
    /**
     * 传递书籍的ISBN，返回书籍的全部信息
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getBookByISBN.php
     *
     * parameters:
     *     get: ISBN
     *
     * return:
     *     err_code,
     *     data (if err_code == 0)
     *     err_info (if err_code != 0),
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/BookMapper.php';

    use app\mapper\BookMapper;

    if (!empty($_GET)) {
        if (!empty($_GET['ISBN'])) {
            $isbn = $_GET['ISBN'];
            $bookMapper = new BookMapper;
            echo json_encode([
                'err_code' => 0,
                'data' => $bookMapper->getBookByISBN($isbn),
            ]);
        } else {
            echo json_encode([
                'err_code' => 1,
                'err_info' => 'wrong parameter, ISBN is needed.',
            ]);
        }
    }