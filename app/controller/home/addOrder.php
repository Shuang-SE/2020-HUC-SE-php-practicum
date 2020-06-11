<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if ($_SESSION['user_id']) {
        if (!empty($_POST)) {
            $userId = $_SESSION['user_id'];

            $orderMapper = new OrderMapper;
            if ($orderMapper->addToOrderDirectly(
                $userId, $_POST['ISBN'], $_POST['amount'],
                $_POST['total_price'], $_POST['payment_term'], $_POST['delivery_method']
            )) {
                echo json_encode([
                    'err_code' => 0,
                    'err_info' => 'succeed',
                ]);
            }
        }
    }


