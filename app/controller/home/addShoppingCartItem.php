<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if (isset($_SESSION['user_id'])) {
        if (isset($_POST)) {
            $userId = $_SESSION['user_id'];

            $orderMapper = new OrderMapper;
            if ($orderMapper->addToShoppingCart(
                $userId, $_POST['ISBN'], $_POST['amount'], $_POST['total_price']
            )) {
                echo json_encode([
                    'err_code' => 0,
                    'err_info' => 'succeed',
                ]);
            } else {
                echo json_encode([
                    'err_code' => 1,
                    'err_info' => 'failed',
                ]);
            }
        }
    }


