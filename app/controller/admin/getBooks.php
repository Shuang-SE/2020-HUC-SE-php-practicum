<?php
    /**
     * 获取书籍列表接口，同时也是搜索书籍的接口
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getBooks.php
     *
     * parameters:
     *     get: page, size, keyword, type
     *
     * return:
     *     err_code,
     *     [data (if err_code == 0)]: array of Book,
     *         [{ISBN, name, unit_price, cover, type}...]
     *     [err_info (if err_code != 0)]
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/BookMapper.php';

    use app\mapper\BookMapper;

    if (!empty($_GET)) {
        if (isset($_GET['size']) && isset($_GET['page'])) {
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
