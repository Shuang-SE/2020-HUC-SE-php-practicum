<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/BookMapper.php';

    use app\mapper\BookMapper;

    if (!empty($_GET)) {
//        int $page = 1, int $size = 10, string $keyword = null, string $type = null
        if (!empty($_GET['size']) && !empty($_GET['page'])) {
            $page = $_GET['page'];
            $size = $_GET['size'];
            $bookMapper = new BookMapper;
            $keyword = isset($_GET['keyword']) ? $_GET['keyword'] : null;
            $type = isset($_GET['type']) ? $_GET['type'] : null;
            echo json_encode([
                'err_code' => 0,
                'data' => $bookMapper->getPagesOfBooks($page, $size, $keyword, $type),
            ]);
        } else {
            echo json_encode([
                'err_code' => 1,
                'err_info' => '参数不匹配,需要size, page, [keyword, type]',
            ]);
        }
    }
