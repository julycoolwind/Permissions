$(function() {
    $("#login").on("click",function() {
        $.post("/signIn",{"signInMark": $("#signInMark").val(), "pwd": $("#pwd").val(), "saveStates": $("#saveStates").is(":checked")})
            .done(function(data) {
                var result = eval(data);
                if(result.status == 1) {
                    window.location.href="/index";
                } else if(result.status == 2){
                    $(".alert-warning").html("用户不存在...").removeClass("hidden");
                } else {
                    $(".alert-warning").html("密码错误...").removeClass("hidden");
                }
            });
    });
});