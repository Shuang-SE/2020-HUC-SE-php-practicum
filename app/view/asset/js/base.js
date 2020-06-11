export function loadComponent(selector, url, func) {
    $(selector).load(url, func);
}

export function setStyle(selector, url) {
    let style = $("<link>", {
        type: "text/css",
        rel: "stylesheet",
        href: url
    });
    selector.prepend(style);
}

export function retrieveScript(selector, url) {
    let sc = $("<script>", {
        type: "module",
        src: url
    });
    selector.prepend(sc);
}

// 根据type, 设置登录/注册的输入框;
// type === "register" || type === "login", 其余情况非法;
// 规定在任何页面中, 只有div#validateBoxContainer才能是validateBox的容器;
export function setValidateBox(type) {
    const validateBoxContainer = $("#validateBoxContainer");
    loadComponent(validateBoxContainer, `./component/${type}-box.html`, function() {
        setStyle(validateBoxContainer, "../asset/css/component/validate_box.css");
        retrieveScript(validateBoxContainer, `../asset/js/${type}_check.js`);
    });
}

// 设置Header;
// 规定在任何页面中, 只有div#headerContainer才能是header的容器;
export function setHeader() {
    const headerContainer = $("#headerContainer");
    loadComponent(headerContainer, "./component/header.html", function() {
        setStyle(headerContainer, "../asset/css/component/header.css");
        retrieveScript(headerContainer, "../asset/js/header.js");
    });
}

// 设置登录/注册的Modal窗体;
// 规定在任何页面中, 只有div#alidateModalContainer才能是header的容器;
export function setValidateModal() {
    const validateModalContainer = $("#validateModalContainer");
    loadComponent(validateModalContainer, "./component/validate-modal.html", function() {
        setStyle(validateModalContainer, "../asset/css/component/validate_modal.css");
        retrieveScript(validateModalContainer, "../asset/js/validate_modal.js");
    });
}

// 导入分页栏;
export function setPageDivider() {
    const pageDivider = $("#pageDivider");
    loadComponent(pageDivider, "component/page-divider.html", function() {
        setStyle("../asset/css/component/page-divider.css");
    })
}

// 生成书架;
export function generateBookshelf(additionalClasses, num) {
    let src = "";
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            src = "../asset/img/default-cover/default-cover-0.jpg";
            break;
        case 1:
            src = "../asset/img/default-cover/default-cover-1.jpg";
            break;
        case 2:
            src = "../asset/img/default-cover/default-cover-2.jpg";
            break;
        case 3:
            src = "../asset/img/default-cover/default-cover-3.jpg";
            break;
    }

    // 生成一本书;
    function generateBook(data) {
        let bookContainer = $(`<li class="bookContainer"></li>`);
        let cover = $(`<a href="#" title=${data.title}><img class="cover" src="${data.src}" alt=''/></a>`);
        let title = $(`<span class="title">${data.title}</span>`);
        let author = $(`<span class="author">${data.author}</span>`);
        let price = $(`<span class="price"><span class="sign"></span>${data.price}</span>`);
        // 组装;
        return bookContainer.append(cover, title, author, price);
    }

    let bookshelf = $("<ul>", {class: `bookshelf ${additionalClasses}`});

    for (let i = 0; i < num; i++) {
        let data = {
            src: src,
            title: `标题测试${i}...`,
            author: `作者测试${i}...`,
            price: 109.99
        };
        bookshelf.append(generateBook(data));
    }
    return bookshelf;
}

// 生成购物车顶部信息栏;
export function generateInfoTray(type = "shoppingCart") {
    let infoTray = $(`<div id="infoTray" class="shoppingCartItem"></div>`);
    let fakeCheck = $(`<input type="checkbox" name="check" id="fakeCheck"/>`);
    let itemContent = $(`<div class="itemContent">`);
    let fakeTitleImage = $(`<div id="fakeTitleImage" class="titleImage"></div>`);
    let titleLabel = $(`<div id="titleLabel" class="title">商品名称</div>`);
    let priceLabel = $(`<span id="priceLabel" class="price">单价</span>`);
    let numberCounterLabel = $(`<div id="numberCounterLabel" class="counterContainer">数量</div>`);
    let totalPriceLabel = $(`<span id="totalPriceLabel" class="totalPrice">金额</span>`);
    let operationLabel = $(`<div id="operationLabel" class="operationContainer">操作</div>`);
    if(type === "pay") {
        fakeCheck = null;
    }
    else if(type === "order") {
        fakeCheck = null;
        operationLabel = $(`<div id="operationLabel" class="operationContainer">创建时间</div>`);
    }
    // 组装;
    itemContent.append(fakeTitleImage, titleLabel, priceLabel, numberCounterLabel, totalPriceLabel, operationLabel);
    return infoTray.append(fakeCheck, itemContent);
}

// 生成购物车项;
export function generateShoppingCartItem(index, data, type = "shoppingCart") {
    let cartItem = $(`<div id="item${index}" class="shoppingCartItem"></div>`);
    let check = $(`<input type="checkbox" name="check" id="itemCheck${index}"/>`);
    let itemContent = $(`<div class="itemContent"></div>`);
    let isbn = $(`<input type="hidden" name="ISBN${index}" value="${data.isbn}"/>`);
    let totalPrice = $(`<input type="hidden" name="totalPrice{index}" value="${data.price}"/>`);
    let titleImage = $(`<a id="titleImage${index}" class="titleImage" href="#" title="${data.title}"><img src="${data.img}"/></a>`);
    let title = $(`<a class="title" href="#" title="${data.title}">${data.title}</a>`);
    let priceLabel = $(`<span id="price${index}" class="price"><span class="sign"></span>${data.price}</span>`);
    let counterContainer = $(`<div class="counterContainer"></div>`);
    let counterMinus = $(`<span id="counterMinus${index}" class="counterMinus">-</span>`);
    let counter = $(`<input type="text" name="counter${index}" class="counter" value="1" maxlength="3"/>`);
    let counterAdd = $(`<span id="counterAdd${index}" class="counterAdd">+</span>`);
    let totalPriceLabel = $(`<span id="totalPrice${index}" class="totalPrice"><span class="sign"></span>${data.price}</span>`);
    let operationContainer = $(`<div class="operationContainer"></div>`);
    let deleteCartItem = $(`<span id="deleteCartItem${index}" class="deleteCartItem">删除</span>`);
    let payForCartItem = $(`<a id="payForCartItem${index}" class="payForCartItem" href="#">立即付款</a>`);
    if(type === "pay") {
        check = payForCartItem = null;
    }
    else if(type === "order") {
        check = payForCartItem = counterMinus = counterAdd = null;
        counter = $(`<span id="counter${index}" class="counter">${data.counter}</span>`);
        deleteCartItem = $(`<span id="itemCreateTime{index}" class="itemCreateTime">${data.createTime}</span>`);
    }
    // 组装;
    counterContainer.append(counterMinus, counter, counterAdd);
    operationContainer.append(deleteCartItem, payForCartItem);
    itemContent.append(isbn, totalPrice, titleImage, title, priceLabel, counterContainer, totalPriceLabel, operationContainer);
    return cartItem.append(check, itemContent);
}

// 生成购物车底部操作栏;
export function generateConfirmPanel(type = "shoppingCart") {
    let confirmPanel = $(`<div id="confirmPanel">`);
    let checkAll = $(`<label><input type="checkbox" name="checkAll" id="checkAll"/>全选</label>`);
    let deleteSelected = $(`<span id="deleteSelected">删除选中</span>`);
    let selectedCounter = $(`<span id="selectedCounter">已选0项</span>`);
    let sumPrice = $(`<span id="sumPrice"><span class="sign"></span>0</span>`);
    let payButton = $(`<input type="submit" value="去付款" id="payButton"/>`);
    if(type === "pay") {
        checkAll = deleteSelected = selectedCounter = null;
        payButton = $(`<input type="button" value="确认付款" id="payButton"/>`);
    }
    // 组装;
    return confirmPanel.append(checkAll, deleteSelected, selectedCounter, sumPrice, payButton);
}

// 生成购物车, 要求给购物车项目数量, 类型(默认是购物车)和提交目标;
export function generateShoppingCart(data, num, url, type = "shoppingCart") {
    // 生成容器和顶栏;
    let shoppingCartContainer = $(`<div id="shoppingCartContainer"></div>`);
    shoppingCartContainer.append(generateInfoTray(type));
    // 生成购物车主体;
    let shoppingCart = $(`<form id="shoppingCart" action=${url} method="post">`);
    for(let i = 0; i < num; i++) {
        data = {
            isbn: `201736025030${i}`,
            title: `测试标题${i}`,
            img: "../asset/img/default-cover/default-cover-0.jpg",
            price: 199.99,
            counter: 5,
            createTime: new Date()
        };
        shoppingCart.append(generateShoppingCartItem(i, data, type));
    }
    // 生成底栏, 查看订单页不需要底栏;
    if(type !== "order") {
        shoppingCart.append(generateConfirmPanel(type));
    }
    return shoppingCartContainer.append(shoppingCart);
}

