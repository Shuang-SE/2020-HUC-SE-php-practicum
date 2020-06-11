import {generateBookshelf, setHeader, setValidateModal} from "./base.js";

$().ready(function() {
    // 导入header;
    setHeader();

    // 导入验证的Modal;
    setValidateModal();

    // 动态生成图书类别栏;
    function generateClassList(num) {
        let classListContainer = $(`<div id="classListContainer">`);
        let classListTitle = $(`<div id="classListTitle">图书分类</div>`);
        classListContainer.append(classListTitle);
        let classList = $(`<ul id="classList">`);
        for(let i = 0; i < num; i++) {
            let data = {
                className: `图书分类${i}`
            };
            classList.append($(`<li><a href='#'>${data.className}</a></li>`));
        }
        return classListContainer.append(classList);
    }
    $("#leftFrame").append(generateClassList(10));

    // 动态生成类别横向导航条;
    function generateClassNav(num) {
        let classNav = $(`<ul id="classNav">`);
        let prefix = "classTitle";
        for(let i = 0; i < num; i++) {
            let data = {
                className: `图书分类${i}`
            };
            if(i === 0) {
                classNav.append($(`<li class="${prefix}0 on"><span>${data.className}</span></li>`));
            }
            else {
                classNav.append($(`<li class="${prefix}${i} off"><span>${data.className}</span></li>`));
            }
        }
        return classNav;
    }
    $("#mainContainer").append(generateClassNav(10));

    // 动态生成多个书架;
    function generateMultiBookshelf(num) {
        let prefix = "classShelf";
        const bookshelfContainer = $(`<div id="bookshelfContainer">`);
        bookshelfContainer.append(generateBookshelf(`${prefix}0 display`, 10));
        for(let i = 1; i < num; i++) {
            bookshelfContainer.append(generateBookshelf(`${prefix}${i} hidden`, 10));
        }
        return bookshelfContainer;
    }
    $("#mainContainer").append(generateMultiBookshelf(10));

    // 给导航栏的每个类别标签都绑定上触发事件;
    function bindForClassNav(trigger, target) {
        trigger.on("mouseenter", function() {
            let lastTrigger = $("#classNav li.on");
            let lastActive = $("ul.bookshelf.display");
            lastTrigger.toggleClass("on off");
            trigger.toggleClass("on off");
            lastActive.toggleClass("display hidden");
            target.toggleClass("display hidden");
        });
    }

    $("#classNav > li").each(function(index) {
        bindForClassNav($(this), $(`ul.classShelf${index}`));
    });
});