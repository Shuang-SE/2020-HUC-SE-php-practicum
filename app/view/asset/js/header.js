// 根据用户的登录状态, 决定显示的内容;
function toggleUserPanel() {
    /*TO DO: 实现判断用户是否登录的功能*/
    let isLogin = true;
    let user = $("#user");
    let loginButton = $("#loginButton");
    let registerButton = $("#registerButton");
    if(isLogin) {
        user.css("display", "inline-block");
        loginButton.css("display", "none");
        registerButton.css("display", "none");
    }
    else {
        user.css("display", "none");
        loginButton.css("display", "inline-block");
        registerButton.css("display", "inline-block");
    }
}

toggleUserPanel();
