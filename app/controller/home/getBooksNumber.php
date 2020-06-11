<?php
    /**
     * 获取搜索项/全部书籍的数目
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getBooksNumber.php
     *
     * parameters:
     *     get: [keyword, type]optional
     *
     * return:
     *     err_code,
     *     data: int
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/BookMapper.php';

    use app\mapper\BookMapper;

    if (isset($_GET)) {
        $bookMapper = new BookMapper;
        $keyword = isset($_GET['keyword']) ? $_GET['keyword'] : null;
        $type = isset($_GET['type']) ? $_GET['type'] : null;
        echo json_encode([
            'err_code' => 0,
            'data' => $bookMapper->count($keyword, $type),
        ]);
    }
