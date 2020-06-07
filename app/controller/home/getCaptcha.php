<?php
    require_once '../../lib/common.php';
    if ($_GET) {
        if (isset($_SESSION['captcha'])) {
            $json = [
                'err_code' => 0,
                'captcha' => $_SESSION['captcha'],
            ];
            echo json_encode($json);
        } else {
            $json = [
                'err_code' => 1,
                'err_info' => 'session失效或未请求验证码'
            ];
            echo json_encode($json);
        }
    }
