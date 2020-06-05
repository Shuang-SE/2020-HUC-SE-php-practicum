<?php

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if ($_POST) {

        $userMapper = new UserMapper();
        $id = $userMapper->addUser('asd', 'zxc', 'user',
            '15', 'tel: 15636624455', 'male');
        if (!$id) {
            $res = [
                'err_code' => 1,
                'err_info' => 'insert failed',
            ];
        } else {
            $res = [
                'err_code' => 0,
                'user_id' => $id,
            ];
        }
        echo json_encode($res);
    }
