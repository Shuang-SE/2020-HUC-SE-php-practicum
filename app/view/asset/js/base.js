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
        setStyle(header, "../asset/css/header.css");
        retrieveScript(header, "../asset/js/header.js");
    });
}

export function generateBookshelf(additionalClasses, num) {
    let src = "";
    // 到时候要查数据库, 现在是假随机;
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
    let module =
        `<li class="bookContainer">
     <img src="${src}" class="cover"/>
     <span class="title">测试...</span>
     <span class="author">测试...</span>
     <span class="price">109.99</span>
     </li>`;

    let bookshelf = $("<ul>", {class: `bookshelf ${additionalClasses}`});

    for (let i = 0; i < num; i++) {
        let book = $(module);
        bookshelf.append(book);
    }
    return bookshelf;
}
