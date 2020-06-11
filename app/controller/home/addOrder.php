<?php
    /**
     * 将购物车中的商品放置到订单中
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/addOrder.php
     *
     * parameters:
     *     post: order_id, payment_term, delivery_method
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/OrderMapper.php';

    use app\mapper\OrderMapper;

    if (isset($_SESSION['user_id'])) {
        if (isset($_POST)) {
            $userId = $_SESSION['user_id'];

            $orderMapper = new OrderMapper;
            if ($orderMapper->addToOrder(
                $_POST['order_id'], $_POST['payment_term'], $_POST['delivery_method']
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


