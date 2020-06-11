<?php
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if (isset($_SESSION['is_admin'])) {
        if ($_GET) {
            $orderMapper = new OrderMapper();
            echo json_encode([
                'err_code' => 0,
                'data' => $orderMapper->getAllOrders(),
            ]);
        } else {
            echo json_encode([
                'err_code' => 1,
                'data' => 'no authority, this page is only accessible for administrator',
            ]);
        }
    }
