<?php
    /**
     * 普通用户注册接口
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/register.php
     * parameters:
     *     post: username, password, age, contact_info, gender
     *
     * returns:
     *     err_code,
     *     [user_id (if err_code == 0)] (saved in session as 'user_id' if register succeed),
     *     [err_info (if err_code != 0)]
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if ($_POST) {
        $userMapper = new UserMapper;
        if (!$userMapper->isDuplicated($_POST['username'])) {
            $id = $userMapper->addUser(
                $_POST['username'], $_POST['password'], $_POST['age'],
                $_POST['contact_info'], $_POST['gender']
            );
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
