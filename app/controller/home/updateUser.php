<?php
    /**
     *
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if (isset($_SESSION['user_id'])) {
        $userMapper = new UserMapper;

        if ($userMapper->updateUser(
            $_SESSION['user_id'], $_POST['username'], $_POST['age'], $_POST['contactInfo'], $_POST['gender']
        )) {

        }
    } else {
        echo json_encode([
            'err_code' => 1,
            'err_info' => 'session lost',
        ]);
    }