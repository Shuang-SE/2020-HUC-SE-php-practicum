import {setHeader, generateBookshelf} from "./base.js";

$().ready(function() {
    // 导入header;
    setHeader({});

    // 动态生成类别畅销榜单;
    function generateRankList(num) {
        let rankListContainer = $(`<div id="rankListContainer">`);
        let rankListTitle = $(`<div id="rankListTitle">畅销榜单</div>`);
        rankListContainer.append(rankListTitle);

        // 用于生成畅销榜单列表项;
        function generateRankListItem(index, data) {
            let item = $(`<li></li>`);
            if(index === 1) {
                item.addClass("unfold");
            }
            else {
                item.addClass("fold");
            }
            if(index <= 3) {
                item.addClass("top3");
            }
            let rankNum = $(`<span class="rankNum">${index}</span>`);
            let rankContent = $(`<div class="rankContent"></div>`);
            let titleImage = $(`<a id="rankListTitleImage${index}" class="titleImage" href="#" title=${data.title}><img src="${data.img}"/></a>`);
            let itemInfo = $(`<div class="itemInfo"></div>`);
            let title = $(`<a id="rankListTitle${index}" class="title" href="#" title=${data.title}>${data.title}</a>`);
            let price = $(`<span class='price'><span class='sign'></span>${data.price}</span>`);
            let rankListIsbn = $(`<span id="rankListIsbn${index}" class="rankListIsbn">${data.isbn}</span>`);
            // 组装;
            itemInfo.append(title, price, rankListIsbn);
            rankContent.append(titleImage, itemInfo);
            return item.append(rankNum, rankContent);
        }

        let rankList = $(`<ul id="rankList">`);

        for(let i = 0; i < num; i++) {
            let data = {
                img: "../asset/img/default-cover/default-cover-0.jpg",
                title: `标题测试${i + 1}...`,
                price: 199.99,
                isbn: `201736025030${i + 1}`
            };
            rankList.append(generateRankListItem(i + 1, data));
        }
        return rankListContainer.append(rankList);
    }
    $("#leftContainer").append(generateRankList(10));

    // 生成一个书架;
    function getBookshelfContainer() {
        const bookshelfContainer = $(`<div id="bookshelfContainer"></div>`);
        return bookshelfContainer.append(generateBookshelf("", 8));
    }
    $("#mainContainer").append(getBookshelfContainer());

    // 给畅销榜的每个项目标签都绑定上触发事件;
    function bindForRankList(target) {
        target.on("mouseenter", function() {
            let lastActive = $("#rankList > li.unfold");
            lastActive.toggleClass("fold unfold");
            target.toggleClass("fold unfold");
        });
    }

    $("#rankList > li").each(function() {
        bindForRankList($(this));
    });
});
