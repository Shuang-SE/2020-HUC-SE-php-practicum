import {setHeader, generateShoppingCart} from "./base.js";

$().ready(function() {
    // 导入header;
    setHeader();

    // 动态生成购物车;
    $("#mainContainer").append(generateShoppingCart({}, 2, "", "order"));
});