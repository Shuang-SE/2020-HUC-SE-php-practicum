import {loadComponent, setStyle, retrieveScript, generateBookshelf} from "./base.js";

$().ready(function() {
    const headerWrapper = $("#headerWrapper");
    loadComponent(headerWrapper, "component/header.html", function() {
        setStyle(headerWrapper, "../asset/css/header.css");
        retrieveScript(headerWrapper, "../asset/js/header.js");
    });

    // 动态生成图书类别栏;
    function generateClassList(num) {
        let classList = $("<ul>", {id: "classList"});
        for(let i = 0; i < num; i++) {
            classList.append($("<li><a href='#'>图书分类</a></li>"));
        }
        return classList;
    }
    $("#classListWrapper").append(generateClassList(10));

    // 动态生成类别横向导航条;
    function generateClassNav(num) {
        let classNav = $("<ul>", {id: "classNav"});
        let prefix = "classTitle";
        classNav.append($(`<li class="${prefix}0 on"><span>图书分类</span></li>`));
        for(let i = 1; i < num; i++) {
            classNav.append($(`<li class="${prefix}${i} off"><span>图书分类</span></li>`));
        }
        return classNav;
    }
    $("#mainWrapper").append(generateClassNav(10));

    // 动态生成多个书架;
    function getMultiBookshelf(num) {
        let prefix = "classShelf";
        const bookshelfContainer = $("<div>", {id: "bookshelfContainer"});
        bookshelfContainer.append(generateBookshelf(`${prefix}0 display`, 10, 10));
        for(let i = 1; i < num; i++) {
            bookshelfContainer.append(generateBookshelf(`${prefix}${i} hidden`, 10, 10));
        }
        return bookshelfContainer;
    }
    $("#mainWrapper").append(getMultiBookshelf(10));

    // 给导航栏的每个类别标签都绑定上触发事件;
    function bindForNav(trigger, target) {
        trigger.on("mouseenter", function() {
            let lastTrigger = $("#classNav li.on");
            let lastActive = $(".bookshelf.display");
            lastTrigger.toggleClass("on off");
            trigger.toggleClass("on off");
            lastActive.toggleClass("display hidden");
            target.toggleClass("display hidden");
        });
    }

    $("#classNav > li").each(function(index) {
        bindForNav($(this), $(`ul.classShelf${index}`));
    });
});