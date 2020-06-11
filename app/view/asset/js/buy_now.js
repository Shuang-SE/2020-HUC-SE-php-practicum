import {setHeader, generateShoppingCart} from "./base.js";
import {bindForCounterButtons, bindForCounter} from "./shopping_cart_module.js";
import {bindForDeleteButton, calculateSumPrice} from "./shopping_cart_module.js";

$().ready(function() {
    // 导入header;
    setHeader({});

    // 当前购物车项目数量;
    let num = 2;

    // 动态生成购物车;
    $("#mainContainer").append(generateShoppingCart({}, num, "./user-orders.html", "pay"));

    function bindForOrders(num) {
        // 一开始要计算一下所有的价格(确认订单界面默认都选上了);
        calculateSumPrice(num);
        bindForCounterButtons(num);
        bindForDeleteButton(num);
        bindForCounter(num);
    }
    bindForOrders(num);

    // 动态生成Modal窗体, 模拟付款;
    function generateConfirmModal() {
        let confirmModal = $(`<div id="confirmModal"></div>`);
        let modalContainer = $(`<div id="modalContainer"></div>`);
        let payMethods = $(`<div id="payMethods"></div>`);
        let byAliPay = $(`<input type="radio" name="payMethod" id="aliPay" checked/><label for="aliPay">支付宝</label>`);
        let byWeChat = $(`<input type="radio" name="payMethod" id="weChat"/><label for="weChat">微信</label>`);
        let byUnionPay = $(`<input type="radio" name="payMethod" id="unionPay"/><label for="unionPay">银联</label>`);
        let byVisa = $(`<input type="radio" name="payMethod" id="Visa"/><label for="Visa">Visa</label>`);
        let modalButtonContainer = $(`<div id="modalButtonContainer"></div>`);
        let confirmButton = $(`<input type="submit" value="确定"/>`);
        let cancelButton = $(`<input type="button" value="取消"/>`);
        // 组装;
        modalButtonContainer.append(confirmButton, cancelButton);
        payMethods.append(byAliPay, byWeChat, byUnionPay, byVisa);
        modalContainer.append(payMethods, modalButtonContainer);
        return confirmModal.append(modalContainer);
    }
    $("#shoppingCart").append(generateConfirmModal());

    // 绑定购物车付款按钮事件;
    function bindForPayButton() {
        $("#payButton").on("click", function() {
            $("#confirmModal").css("display", "block");
        });
    }
    bindForPayButton();

    // 绑定Modal按钮事件;
    function bindForModal() {
        let confirmButton = null;
        let cancelButton = $(`#modalButtonContainer > input[type="button"]`);
        cancelButton.on("click", function() {
            $("#confirmModal").css("display", "none");
        });
    }
    bindForModal();
});
