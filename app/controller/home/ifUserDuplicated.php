<?php
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if (!empty($_GET) && !empty($_GET['username'])) {
        $userMapper = new UserMapper;
        if (!$userMapper->isDuplicated($_GET['username'])) {
            echo json_encode([
                'err_code' => 0
            ]);
        } else {
            echo json_encode([
                'err_code' => 1,
                'err_info' => 'username duplicated'
            ]);
        }
    }
