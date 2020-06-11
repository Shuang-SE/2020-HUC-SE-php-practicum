import {setValidateBox} from "./base.js";

$().ready(function() {
    // setValidateBox("login");

    $("#loginOption").on("click", function() {
        // $("#validateBox").remove();
        setValidateBox("login");
    });

    $("#registerOption").on("click", function() {
        setValidateBox("register");
    });

    $("#loginOption").click();

    $("#closeValidateModal").on("click", function() {
        $("#validateModal").css("display", "none");
    });
});