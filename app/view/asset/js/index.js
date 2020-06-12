import {generateBookshelf, setHeader} from "./base.js";
import {setValidateModal, setBookInfoModal} from "./base.js";

$().ready(function() {
    // 导入header;
    function setHeaderWrapper() {
        setHeader({});
    }
    setHeaderWrapper();

    // 导入验证的Modal;
    setValidateModal();

    // 导入详情的Modal;
    setBookInfoModal();

    let classes = null;
    $.ajaxSettings.async = false;
    $.get("http://localhost:63342/2020-HUC-SE-php-practicum/app/controller/home/getTypes.php",
        {},
        function(result) {
            classes = result.data;
        }, 'json'
    );

    // 动态生成图书类别栏;
    function generateClassList() {
        let classListContainer = $(`<div id="classListContainer">`);
        let classListTitle = $(`<div id="classListTitle">图书分类</div>`);
        classListContainer.append(classListTitle);
        let classList = $(`<ul id="classList">`);
        for(let i = 0; i < classes.length; i++) {
            let classListItem = $(`<li></li>`);
            let classTitle = $(`<a id="classTitle${i}" href="#" title="${classes[i].class}">${classes[i].class}</a>`);
            // let className = $(`<span id="className${i}" class="className">${data.className}</span>`);
            classTitle.on("click", function() {
                location.href = `./detailed-class.html?type=${classes[i].class}&length=${classes.length}`;
            });
            classListItem.append(classTitle);
            classList.append(classListItem);
        }
        return classListContainer.append(classList);
    }
    $("#leftFrame").append(generateClassList());

    // 动态生成类别横向导航条;
    function generateClassNav() {
        let classNav = $(`<ul id="classNav">`);
        let prefix = "classTitle";
        for(let i = 0; i < classes.length; i++) {
            if(i === 0) {
                classNav.append($(`<li class="${prefix}0 on"><span>${classes[i].class}</span></li>`));
            }
            else {
                classNav.append($(`<li class="${prefix}${i} off"><span>${classes[i].class}</span></li>`));
            }
        }
        return classNav;
    }
    $("#mainContainer").append(generateClassNav(10));

    // 动态生成多个书架;
    function generateMultiBookshelf(num) {
        let prefix = "classShelf";
        const bookshelfContainer = $(`<div id="bookshelfContainer">`);

        bookshelfContainer.append(generateBookshelf(`${prefix}0 display`, classes[0].class, 10));
        for(let i = 1; i < num; i++) {
            bookshelfContainer.append(generateBookshelf(`${prefix}${i} hidden`, classes[i].class, 10));
        }
        return bookshelfContainer;
    }
    $("#mainContainer").append(generateMultiBookshelf(classes.length));

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