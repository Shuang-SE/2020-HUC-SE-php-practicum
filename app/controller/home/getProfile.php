<?php
    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if ($_GET) {
        if (isset($_SESSION['user_id'])) {
            $userId = $_SESSION['user_id'];
            $userMapper = new UserMapper;
            $json = [
                'err_code' => 0,
                'data' => isset($_GET['brief'])
                    ? $userMapper->getBriefUserById($userId)
                    : $userMapper->getUserById($userId),
            ];
            echo json_encode($json);
        } else {
            echo json_encode([
                'err_code' => 1,
                'err_info' => 'session失效或未登录',
            ]);
        }
    }
