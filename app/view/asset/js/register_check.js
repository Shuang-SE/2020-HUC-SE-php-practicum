// 用来指代每个必填项的状态(是否通过验证);
let checkStatus = [false, false, false, false, false];

// 工具函数, 用于设定提示的样式和状态;
export function setPromptInfo(selector, info, style) {
    selector.html(info);
    selector.attr("class", `promptInfo ${style}`);

}

// 刷新验证码;
export function refreshCaptcha(event) {
    event.data.captchaImage.attr("src", `http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/captchaGenerator.php?timestamp=${new Date().valueOf()}`);
}

// 验证码输入提示;
export function captchaOnFocus(event) {
    setPromptInfo(event.data.captchaPrompt, "点击图片可以刷新验证码, 不区分大小写", "prompt");
}

// Ajax验证验证码;
export function captchaOnBlur(event) {
    let index = event.data.index;
    let captchaVal = event.data.captcha.val();
    let captchaPrompt = event.data.captchaPrompt;
    if (captchaVal === "") {
        setPromptInfo(captchaPrompt, "请输入验证码!", "error");
        return checkStatus[index] = false;
    }
    checkStatus[index] = true;
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
        return checkStatus[index] = false;
    }
    if (checkStatus[index]) {
        setPromptInfo(captchaPrompt, "验证码输入正确!", "correct");
    }
    return checkStatus[index];
}

$().ready(function() {
    const username = $("#username");
    const usernamePrompt = $("#usernamePrompt");
    const password = $("#password");
    const passwordPrompt = $("#passwordPrompt");
    const rePassword = $("#rePassword");
    const rePasswordPrompt = $("#rePasswordPrompt");
    const phoneNumber = $("#phoneNumber");
    const phoneNumberPrompt = $("#phoneNumberPrompt");
    const captchaImage = $("#captchaImage");
    const captcha = $("#captcha");
    const captchaPrompt = $("#captchaPrompt");
    const form = $("#registerForm");
    const lastCheckInfo = $("#lastCheckInfo");
    // 事件绑定;
    // 用户名输入提示;
    username.on("focus", function() {
        setPromptInfo(usernamePrompt, "可包含汉字、英文和数字, 但不以数字开头", "prompt");
    });

    // Ajax验证用户名;
    username.on("blur", "", {index: 0}, function(event) {
        let index = event.data.index;
        let usernameVal = username.val();
        if (usernameVal === "") {
            setPromptInfo(usernamePrompt, "用户名不能为空!", "error");
            return checkStatus[index] = false;
        }
        let pattern = /^[^\d][\u4E00-\u9FA5\w]*$/;
        if (!usernameVal.match(pattern)) {
            setPromptInfo(usernamePrompt, "只能包含汉字、字母或数字, 且不以数字开头!", "error");
            return checkStatus[index] = false;
        }
        checkStatus[index] = true;
        $.get("http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/ifUserDuplicated.php",
            {username: usernameVal},
            function(result) {
                if(result['err_code'] !== 0) {
                    setPromptInfo(usernamePrompt, "用户名已被占用!", "error");
                    checkStatus[index] = false;
                }
            }, "json");
        if (checkStatus[index]) {
            setPromptInfo(usernamePrompt, "用户名可用!", "correct");
        }
        return checkStatus[index];
    });

    // 密码输入提示;
    password.on("focus", function() {
        setPromptInfo(passwordPrompt, "至少包含1个大小写字母、数字和特殊符号", "prompt");
    });

    // 验证密码;
    password.on("blur", "", {index: 1}, function(event) {
        let index = event.data.index;
        let passwordVal = password.val();
        if (passwordVal === "") {
            setPromptInfo(passwordPrompt, "请输入密码!", "error");
            return checkStatus[index] = false;
        } else if (passwordVal.length < 8 || passwordVal.length > 20) {
            setPromptInfo(passwordPrompt, "密码长度8~20位, 请核实!", "error");
            return checkStatus[index] = false;
        }
        // 英文字母/数字/标点符号;
        let pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e])[\w\x21-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]{8,20}$/;
        if (!passwordVal.match(pattern)) {
            setPromptInfo(passwordPrompt, "请至少包含1个大小写字母、数字和特殊符号!", "error");
            return checkStatus[index] = false;
        }
        setPromptInfo(passwordPrompt, "密码可用!", "correct");
        // 输入或修改密码后, 重复输入密码框立即获得焦点;
        rePassword.focus();
        return checkStatus[index] = true;
    });

    // 重复密码输入提示;
    rePassword.on("focus", function() {
        setPromptInfo(rePasswordPrompt, "请再次输入密码", "prompt");
    });

    // 重复验证密码;
    rePassword.on("blur", "", {index: 2}, function(event) {
        let index = event.data.index;
        let passwordVal = password.val();
        let rePasswordVal = rePassword.val();
        if (rePasswordVal === "") {
            setPromptInfo(rePasswordPrompt, "请再次输入密码!", "error");
            return checkStatus[index] = false;
        } else if (passwordVal !== rePasswordVal) {
            setPromptInfo(rePasswordPrompt, "两次输入密码不一致, 请核实!", "error");
            return checkStatus[index] = false;
        }
        setPromptInfo(rePasswordPrompt, "两次输入密码一致!", "correct");
        return checkStatus[index] = true;
    });

    // 手机号码输入提示;
    phoneNumber.on("focus", function() {
        setPromptInfo(phoneNumberPrompt, "请输入11位手机号码", "prompt");
    });

    // 验证手机号码;
    phoneNumber.on("blur", "", {index: 3}, function phoneNumberOnBlur(event) {
        let index = event.data.index;
        let phoneNumberVal = phoneNumber.val();
        if (phoneNumberVal === "") {
            setPromptInfo(phoneNumberPrompt, "手机号码不能为空!", "error");
            return checkStatus[index] = false;
        }
        let pattern = /^1(?:[389]\d|4[4-9]|5[0-35-9]|6[67]|7[0-13-8])\d{8}$/;
        if (!phoneNumberVal.match(pattern)) {
            setPromptInfo(phoneNumberPrompt, "请输入正确的手机号码!", "error");
            return checkStatus[index] = false;
        } else {
            setPromptInfo(phoneNumberPrompt, "手机号码可用!", "correct");
            return checkStatus[index] = true;
        }
    });

    captchaImage.on("click", "", {captchaImage: captchaImage}, refreshCaptcha);
    captcha.on("focus", "", {captchaPrompt: captchaPrompt}, captchaOnFocus);
    captcha.on("blur", "", {index: 4, captcha: captcha, captchaPrompt: captchaPrompt}, captchaOnBlur);

    // 表单验证;
    form.on("submit", function(event) {
        username.blur();
        password.blur();
        rePassword.blur();
        phoneNumber.blur();
        captcha.blur();
        let flag = true;
        checkStatus.forEach(function(status) {
            flag = flag && status;
        });
        if (flag) {
            lastCheckInfo.css("display", "none");
            $.post("http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/register.php",
                {username: username.val(), password: password.val(), age: 18, contact_info: phoneNumber.val(), gender: $(`input[name="gender"]`).val()},
                function(result) {
                    if(!result['err_code']) {
                        location.href = "./login.html";
                    }
                }, 'json');
        }
        lastCheckInfo.css("display", "inline");
        return false;
    });
});