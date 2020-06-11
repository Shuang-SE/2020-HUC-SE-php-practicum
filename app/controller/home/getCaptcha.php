<?php
    /**
     * 获取session中保存的验证码字符串
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getCaptcha.php
     *
     * return:
     *     err_code,
     *     captcha (if err_code == 0),
     *     err_info (if err_code != 0)
     */

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
