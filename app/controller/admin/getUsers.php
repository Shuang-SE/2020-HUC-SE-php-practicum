<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if ($_GET) {
        if (!empty($_SESSION['is_admin'])) {
            $userMapper = new UserMapper;
            echo json_encode([
                'err_code' => 0,
                'data' => $userMapper->getUsers(),
            ]);
        } else {
            echo json_encode([
                'err_code' => 1,
                'data' => 'no authority, this page is only accessible for administrator',
            ]);
        }
    }
