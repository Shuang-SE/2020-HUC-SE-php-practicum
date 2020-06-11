<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if (!empty($_SESSION['user_id'])) {
        echo json_encode([
            'err_code' => 0
        ]);
    } else {
        echo json_encode([
            'err_code' => 1
        ]);
    }