<?php


    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/BookMapper.php';

    use app\mapper\BookMapper;

    if (isset($_GET)) {
        $bookMapper = new BookMapper;
        echo json_encode([
            'err_code' => 0,
            'data' => $bookMapper->getTypes(),
        ]);
    }
