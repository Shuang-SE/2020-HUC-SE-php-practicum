import {setHeader, generateShoppingCart} from "./base.js";
import {bindForCounterButtons, bindForCounter} from "./shopping_cart_module.js";
import {bindForDeleteButton, bindForItemCheck} from "./shopping_cart_module.js";
import {bindForCheckAllButton, bindForDeleteSelectedButton} from "./shopping_cart_module.js";

$().ready(function() {
    // 导入header;
    setHeader({});

    // 当前购物车项目数量;
    let num = 2;

    // 动态生成购物车;
    $("#mainContainer").append(generateShoppingCart({}, num, "./buy-now.html"));

    // 维护一个变量, 表示选中的购物车项目数;
    let totalChecked = 0;

    // 维护一个变量, 表示购物车当前还剩下的项目数;
    let currentItemNum = num;

    function bindForShoppingCart(num) {
        bindForCounterButtons(num);
        bindForCounter(num);
        bindForDeleteButton(num, currentItemNum);
        bindForItemCheck(num, currentItemNum, totalChecked);
        bindForCheckAllButton(num);
        bindForDeleteSelectedButton(num);
    }
    bindForShoppingCart(num);
});
