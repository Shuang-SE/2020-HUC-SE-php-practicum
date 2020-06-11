<?php
    /**
     * 获取用户全部订单
     *
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if (isset($_SESSION['user_id'])) {
        $orderMapper = new OrderMapper;
        echo json_encode([
            'err_code' => 0,
            'data' => $orderMapper->getOrders($_SESSION['user_id']),
        ]);
    } else {
        echo json_encode([
            'err_code' => 1,
            'data' => 'session lost.'
        ]);
    }