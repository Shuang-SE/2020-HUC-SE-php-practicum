<?php
    /**
     * 更新用户数据
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/updateUser.php
     *
     * parameters:
     *     post:
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if (isset($_SESSION['user_id'])) {
        $userMapper = new UserMapper;

        $json = [
            'err_code' => 0,
            'info' => ''
        ];
        if ($userMapper->updateUser(
            $_SESSION['user_id'], $_POST['username'], $_POST['age'], $_POST['contactInfo'], $_POST['gender']
        )) {
            $json['info'] .= 'update user basic succeed';
        } else {
            $json['err_code'] = 1;
            $json['info'] .= 'update user basic failed';
        }
        if (isset($_POST['password']) && !empty($_POST['password'])) {
            if ($userMapper->updatePassword($_SESSION['user_id'], $_POST['password'])) {

            } else {

            }
        }
    } else {
        echo json_encode([
            'err_code' => 1,
            'err_info' => 'session lost',
        ]);
    }