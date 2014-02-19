$(function() {
    $("#login").on("click",function() {
        console.log($("#saveStates").is(":checked"));
        $.post("/signIn",{"signInMark": $("#signInMark").val(), "pwd": $("#pwd").val(), "saveStates": $("#saveStates").is(":checked")})
            .done(function(data) {
                var result = eval(data);
                if(result.status == 1) {
                    window.location.href="/index";
                } else if(result.status == 2){
                    $("#warning-msg").html("用户不存在...").removeClass("hidden");
                } else {
                    $("#warning-msg").html("密码错误...").removeClass("hidden");
                }
            });
    });
});