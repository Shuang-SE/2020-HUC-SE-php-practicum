import {setPromptInfo, refreshCaptcha, captchaOnFocus} from "./register_login_base.js";

let usernameStatus = false;
let passwordStatus = false;
let captchaStatus = false;

// Ajax验证验证码;
function captchaOnBlur(event) {
    let captchaVal = event.data.captcha.val();
    let captchaPrompt = event.data.captchaPrompt;
    if (captchaVal === "") {
        setPromptInfo(captchaPrompt, "请输入验证码!", "error");
        return captchaStatus = false;
    }
    captchaStatus = true;
    let captcha = "";
    $.ajaxSettings.async = false;
    $.get(`http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getCaptcha.php?timestamp=${new Date().valueOf()}`,
        {},
        function(result) {
            if(!result['err_code']) {
                captcha = result['captcha'];
            }
        }, 'json');
    if (captchaVal.toLowerCase() !== captcha.toLowerCase()) {
        setPromptInfo(captchaPrompt, "验证码输入有误, 请重新输入!", "error");
        return captchaStatus = false;
    }
    if (captchaStatus) {
        setPromptInfo(captchaPrompt, "验证码输入正确!", "correct");
    }
    return captchaStatus;
}

$().ready(function() {
    const username = $("#username");
    const usernamePrompt = $("#usernamePrompt");
    const password = $("#password");
    const passwordPrompt = $("#passwordPrompt");
    const captchaImage = $("#captchaImage");
    const captcha = $("#captcha");
    const captchaPrompt = $("#captchaPrompt");
    const form = $("#loginForm");
    const lastCheckInfo = $("#lastCheckInfo");

    // 工具函数, 清空错误提示;
    function clearError(event) {
        setPromptInfo(event.data.promptObj, "", "");
    }

    username.on("focus", "", {promptObj: usernamePrompt}, clearError);
    password.on("focus", "", {promptObj: passwordPrompt}, clearError);

    // 用户名不能为空;
    username.on("blur", "", {index: 0}, function(event) {
        let index = event.data.index;
        let usernameVal = username.val();
        if(usernameVal === "") {
            setPromptInfo(usernamePrompt, "用户名不能为空!", "error");
            return usernameStatus = false;
        }
        return usernameStatus = true;
    });

    // 密码不能为空;
    password.on("blur", "", {index: 0}, function(event) {
        let index = event.data.index;
        let passwordVal = password.val();
        if(passwordVal === "") {
            setPromptInfo(passwordPrompt, "请输入密码!", "error");
            return passwordStatus = false;
        }
        return passwordStatus = true;
    });

    // 复用来自其它模块的函数;
    captchaImage.on("click", "", {captchaImage: captchaImage}, refreshCaptcha);
    captcha.on("focus", "", {captchaPrompt: captchaPrompt}, captchaOnFocus);
    captcha.on("blur", "", {captcha: captcha, captchaPrompt: captchaPrompt}, captchaOnBlur);

    // 表单提交前进行的最后检查, 异步验证用户名和密码的匹配性;
    form.on("submit", function() {
        username.blur();
        password.blur();
        captcha.blur();
        let flag = true;
        flag  = (usernameStatus && passwordStatus && captchaStatus);
        if(flag) {
            $.ajaxSettings.async = false;
            $.post("http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/login.php",
                {username: username.val(), password: password.val()},
                function(result) {
                    if(!result['err_code']) {
                        location.href = "./index.html";
                        lastCheckInfo.css("display", "none");
                    }
                    else {
                        lastCheckInfo.css("display", "inline");
                    }
                }, 'json'
            );
        }
        return false;
    });
});