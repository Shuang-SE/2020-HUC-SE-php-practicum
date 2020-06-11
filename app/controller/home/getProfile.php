<?php
    /**
     * 获取当前用户的资料
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getProfile.php
     *
     * parameters:
     *     get: [brief] (get brief user information if set)
     *
     * return:
     *     err_code,
     *     [data (if err_code == 0)]
     *         brief: [username, icon],
     *         total: [username, password, authority, icon, age, contact_info, gender]
     */

    require_once '../../lib/common.php';
    require_once getRootPath() . '/app/mapper/UserMapper.php';

    use app\mapper\UserMapper;

    if ($_GET) {
        if (isset($_SESSION['user_id'])) {
            $userId = $_SESSION['user_id'];
            $userMapper = new UserMapper;
            $json = [
                'err_code' => 0,
                'data' => !empty($_GET['brief'])
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
