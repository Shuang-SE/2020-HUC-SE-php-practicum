import {setHeader, generateBookshelf} from "./base.js";

$().ready(function() {
    // 导入header;
    setHeader();

    // 动态生成购物车;
    function generateShoppingCart(num) {
        let shoppingCartContainer = $(`<div id="shoppingCartContainer"></div>`);
        let shoppingCart = $(`<form id="shoppingCart"></form>`);

        function generateShoppingCartItem(index, data) {
            let cartItem = $(`<div id="item${index}" class="shoppingCartItem">`);
            let check = $(`<input type="checkbox" name="check"/>`);
            let isbn = $(`<input type="hidden" name="ISBN${index}" value="${data.isbn}"/>`);
            let titleImage = $(`<a id="titleImage${index}" class="titleImage" href="#" title="${data.title}"><img src="${data.img}"/></a>`);
            let title = $(`<span class="title">${data.title}</span>`);
            let price = $(`<span id="price${index}" class="price"><span class="sign"></span>${data.price}</span>`);
            let counter = $(`<input type="number" name="counter${index}" class="counter" value="1"/>`);
            let totalPrice = $(`<span id="totalPrice${index}" class="totalPrice"><span class="sign"></span>${data.price}</span>`);
            let operationContainer = $(`<div class="operationContainer">`);
            let deleteCartItem = $(`<a id="payForCartItem${index}" class="payForCartItem" href="#">立即付款</a>`);
            let payForCartItem = $(`<span id="deleteCartItem${index}" class="deleteCartItem">删除</span>`);
            // 组装;
            operationContainer.append(payForCartItem, deleteCartItem);
            return cartItem.append(check, isbn, titleImage, title, price, counter, totalPrice, operationContainer);
        }

        for(let i = 0; i < num; i++) {
            let data = {
                isbn: `201736025030${i}`,
                title: `测试标题${i}`,
                img: "../asset/img/default-cover/default-cover-0.jpg",
                price: 199.99
            };
            shoppingCart.append(generateShoppingCartItem(i, data));
        }
        return shoppingCartContainer.append(shoppingCart);
    }
    $("#mainContainer").append(generateShoppingCart(5));
});
