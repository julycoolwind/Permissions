$(function () {
    var f_pwd = $("#f_password");
    $("form").validation(function (obj, params) {
        if(obj.id == "f_email") {
            $.post("/verifyEmail",{"email":$(obj).val()})
                .done(function(data) {
                    if(data) {
                        params.err = true;
                        params.msg = "邮箱已经注册过，直接<a href=\"login\">登录</a>或换一个邮箱"
                    }
                });
        } else if (obj.id == "f_repwd") {
            var pwd = f_pwd.val();
            if ($(obj).val() != pwd) {
                params.err = true;
                params.msg = "两次密码输入不一致.";
            }
        }
    }, {reqmark: false});
    $("button[type='submit']").on("click", function () {
        console.log("submit");
        if ($("form").valid() == false) {
            return false;
        }
    });
});