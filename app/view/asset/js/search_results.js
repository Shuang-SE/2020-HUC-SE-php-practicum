import {setHeader, generateBookshelf} from "./base.js";

$().ready(function() {
    // 导入header;
    setHeader({});

    // 生成一个书架;
    function getBookshelfContainer() {
        const bookshelfContainer = $("<div>", {id: "bookshelfContainer"});
        return bookshelfContainer.append(generateBookshelf("", 10));
    }
    $("#mainContainer").append(getBookshelfContainer());
});
