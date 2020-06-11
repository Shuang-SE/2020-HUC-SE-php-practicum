import {setHeader, setValidateBox} from "./base.js";


$().ready(function() {
    // 导入header;
    setHeader();

    // 导入用户信息修改框;
    setValidateBox("register");

    // console.log($("#caption").html());
});
