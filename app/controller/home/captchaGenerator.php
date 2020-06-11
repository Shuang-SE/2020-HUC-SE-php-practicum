<?php
    /**
     * 生成注册码图片，并将注册码保存于session中
     * http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/captchaGenerator.php
     */

    require_once '../../lib/common.php';

    header('Content-type:image/jpeg');

    //设置验证码图像的宽和高
    $width = 120;
    $height = 40;

    //验证码可选值
    $element = [
        'a', 'b', 'c', 'd', 'e',
        'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y',
        'z',
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y',
        'Z',
        '1', '2', '3', '4', '5',
        '6', '7', '8', '9', '0',
    ];
    $string = '';
    for ($i = 0; $i < 6; $i++) {
        $string .= $element[rand(0, count($element) - 1)];
    }
    $_SESSION['captcha'] = $string;

    $img = imagecreatetruecolor($width, $height);

    $colorBg = imagecolorallocate($img,
        rand(200, 255), rand(200, 255), rand(200, 255));
    imagefill($img, 0, 0, $colorBg);

    for ($i = 0; $i < 100; $i++) {
        imagesetpixel($img,
            rand(0, $width - 1), rand(0, $height - 1),
            imagecolorallocate($img, rand(100, 200), rand(100, 200), rand(100, 200)));
    }

    for ($i = 0; $i < 3; $i++) {
        imageline($img,
            rand(0, $width / 2), rand(0, $height),
            rand($width / 2, $width), rand(0, $height),
            imagecolorallocate($img, rand(100, 200), rand(100, 200), rand(100, 200)));
    }

    $colorString = imagecolorallocate($img, rand(10, 50), rand(10, 50), rand(10, 50));
    imagettftext($img, 16, rand(-5, 5),
        rand(5, 15), rand(30, 35), $colorString,
        getRootPath() . '/app/view/asset/font/MajorMonoDisplay-Regular.ttf', $string);

    imagejpeg($img);

    imagedestroy($img);
?>
<script>
    console.log(<?=$string?>);
</script>
