<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/BookMapper.php';

    use app\mapper\BookMapper;

    if (!empty($_GET)) {
        $bookMapper = new BookMapper;
        $keyword = isset($_GET['keyword']) ? $_GET['keyword'] : null;
        $type = isset($_GET['type']) ? $_GET['type'] : null;
        echo json_encode([
            'err_code' => 0,
            'data' => $bookMapper->count($keyword, $type),
        ]);
    }
