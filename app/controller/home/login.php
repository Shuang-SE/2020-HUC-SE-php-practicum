<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    function check(UserMapper $userMapper) {
        if (isset($_POST['username']) && isset($_POST['password'])) {
            return $userMapper->exists($_POST['username'], $_POST['password']);
        }
        return false;
    }

    if ($_POST) {
        if (isset($_POST['captcha']) && strtolower($_POST['captcha']) === strtolower($_SESSION['captcha'])) {
            $userMapper = new UserMapper;
            if (check($userMapper)) {
                $_SESSION['user_id'] = $userMapper->getUserId($_POST['username'], $_POST['password']);
                echo json_encode([
                    'err_code' => 0,
                    'err_info' => 'fine.',
                ]);
            } else {
                echo json_encode([
                    'err_code' => 2,
                    'err_info' => '用户名或密码错误',
                ]);
            }
        } else {
            echo json_encode([
                'err_code' => 1,
                'err_info' => '验证码错误',
            ]);
        }
    }