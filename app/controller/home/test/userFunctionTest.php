<html>
    <script>
        let captcha
        $.get('http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getCaptcha.php',
            {},
            function (result) {
                if (!result['err_code']) {
                    captcha = result['captcha']
                }
            },
            'plain'
        )
    </script>
</html>