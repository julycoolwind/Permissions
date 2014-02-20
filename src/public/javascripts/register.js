$(function () {
    var f_pwd = $("#f_password");
    $("form").validation(function (obj, params) {
        if(obj.id == "f_email") {
            $.post("/verifyEmail",{"email":$(obj).val()})
                .done(function(data) {
                    var result = eval(data);
                    if(result.err) {
                        $(".alert-danger").prepend("连接服务器失败，原因:"+result.err).removeClass("hidden");
                    } else if(result.found){
                        params.err = true;
                        params.msg = "邮箱已经注册过，直接<a href=\"login\">登录</a>或换一个邮箱";
                    }
                }).fail(function() {
                    $(".alert-danger").prepend("连接服务器失败，请咨询管理员").removeClass("hidden");
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
        if ($("form").valid() == true) {
            $.post("/signUp",{"email":$("f_email").val(),"nickname":$("f_nickname").val(),"pwd":$("f_password").val()})
                .done(function(data) {
                    var result = eval(data);
                    if(result.error) {
                        $(".alert-danger").html(error).removeClass("hidden");
                    } else {
                        window.location.href="/index";
                    }
                }).fail(function() {
                    $(".alert-danger").prepend("连接服务器失败，请咨询管理员.").removeClass("hidden");
                });
        }
        return false;
    });
});