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
        type: "text/javascript",
        src: url
    });
    selector.prepend(sc);
}

export function setHeader() {
    const header = $("#headerWrapper");
    loadComponent(header, "component/header.html", function() {
        setStyle(header, "../asset/css/component/header.css");
        retrieveScript(header, "../asset/js/header.js");
    });
}

// 导入分页栏;
export function setPageDivider() {
    const pageDivider = $("#pageDivider");
    loadComponent(pageDivider, "component/page-divider.html", function() {
        setStyle("../asset/css/component/page-divider.css");
    })
}

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
