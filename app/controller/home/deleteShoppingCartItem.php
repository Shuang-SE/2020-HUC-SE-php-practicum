<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if (isset($_SESSION['user_id'])) {
        if (isset($_POST['order_id'])) {
            $orderMapper = new OrderMapper;
            if ($orderMapper->deleteShoppingCartItem($_POST['order_id'])) {
                echo json_encode([
                    'err_code' => 0,
                ]);
            } else {
                echo json_encode([
                    'err_code' => 1,
                ]);
            }
        }
    }
