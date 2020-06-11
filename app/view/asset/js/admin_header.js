$().ready(function() {
    $("#cartIcon, #loginButton, #registerButton, #functionArea a").remove();

    const userOptions = $("#userOptions");
    while(userOptions.find("li").length > 1) {
        userOptions.find("li")[0].remove();
    }
});
