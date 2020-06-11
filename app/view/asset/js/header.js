// 根据用户的登录状态, 决定显示的内容;
function toggleUserPanel() {
    let user = $("#user");
    let loginButton = $("#loginButton");
    let registerButton = $("#registerButton");
    // 判断用户是否登录;
    $.ajaxSettings.async = false;
    $.get("http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/ifLoggedIn.php",
        {},
        function(result) {
            if(!result['err_code']) {
                user.css("display", "inline-block");
                loginButton.css("display", "none");
                registerButton.css("display", "none");
            }
            else {
                user.css("display", "none");
                loginButton.css("display", "inline-block");
                registerButton.css("display", "inline-block");
            }
            console.log(result['err_code']);
        }, 'json');
}

toggleUserPanel();
