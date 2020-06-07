<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if ($_POST) {
        $userMapper = new UserMapper;
        if (!$userMapper->isDuplicated($_POST['username'])) {
            $id = $userMapper->addUser($_POST['username'], $_POST['password'], $_POST['authority'],
                $_POST['age'], $_POST['contact_info'], $_POST['gender']);
            if (!$id) {
                $res = [
                    'err_code' => 1,
                    'err_info' => 'register failed',
                ];
            } else {
                $res = [
                    'err_code' => 0,
                    'user_id' => $id,
                ];
                $_SESSION['user_id'] = $id;
            }
            echo json_encode($res);
        } else {
            echo json_encode([
                'err_code' => 2,
                'err_info' => 'duplicated username',
            ]);
        }
    }
