import {setHeader} from "./base.js";

$().ready(function() {
    // 导入header;
    function setHeaderWrapper() {
        let data = {
            html: "../home/component/header.html",
            js: '../asset/js/admin_header.js'
        };
        setHeader(data);
    }
    setHeaderWrapper();
});