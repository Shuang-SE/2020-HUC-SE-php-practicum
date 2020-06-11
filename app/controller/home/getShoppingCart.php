<?php
    /**
     * 获取用户购物车项
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getShoppingCart.php
     *
     * return:
     *     err_code,
     *     data: [{order_id, ISBN, amount, order_status, book_name, unit_price, total_price}, ...]
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if (isset($_SESSION['user_id'])) {
        $orderMapper = new OrderMapper;
        echo json_encode([
            'err_code' => 0,
            'data' => $orderMapper->getShoppingCartByUserId($_SESSION['user_id']),
        ]);
    } else {
        echo json_encode([
            'err_code' => 1,
            'data' => 'session lost.'
        ]);
    }