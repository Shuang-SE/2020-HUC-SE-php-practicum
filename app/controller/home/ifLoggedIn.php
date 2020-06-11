<?php
    /**
     * 检测用户是否登录
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/ifLoggedIn.php
     *
     * return:
     *     err_code 0 (已登录) / 1 (未登录)
     */

    require_once '../../lib/common.php';

    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'err_code' => 0
        ]);
    } else {
        echo json_encode([
            'err_code' => 1
        ]);
    }