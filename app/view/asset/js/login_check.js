import {setPromptInfo, refreshCaptcha, captchaOnFocus, captchaOnBlur} from "./register_check.js";

let checkStatus = [false, false, false];

$().ready(function(options) {
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
            return checkStatus[index] = false;
        }
        return checkStatus[index] = true;
    });

    // 密码不能为空;
    password.on("blur", "", {index: 0}, function(event) {
        let index = event.data.index;
        let passwordVal = password.val();
        if(passwordVal === "") {
            setPromptInfo(passwordPrompt, "请输入密码!", "error");
            return checkStatus[index] = false;
        }
        return checkStatus[index] = true;
    });

    // 复用来自其它模块的函数;
    captchaImage.on("click", "", {captchaImage: captchaImage}, refreshCaptcha);
    captcha.on("focus", "", {captchaPrompt: captchaPrompt}, captchaOnFocus);
    captcha.on("blur", "", {index: 2, captcha: captcha, captchaPrompt: captchaPrompt}, captchaOnBlur);

    // 表单提交前进行的最后检查, 异步验证用户名和密码的匹配性;
    form.on("submit", function() {
        username.blur();
        password.blur();
        captcha.blur();
        let flag = true;
        checkStatus.forEach(function(status) {
            flag = flag && status;
        });
        if(flag) {
            $.ajax({
                url: `ajax_login_check_servlet?timestamp=${new Date().valueOf()}`,
                method: "get",
                content: "text",
                async: false,
                success: function(data) {
                    if(data === "false") {
                        return flag = false;
                    }
                }
            });
            if(flag) {
                lastCheckInfo.css("display", "none");
                return true;
            }
        }
        lastCheckInfo.css("display", "inline");
        return false;
    });
});