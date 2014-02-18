var userBO = require("../business/userBO");

exports.login = function(req, res){
    res.render("login", { title: "登录用户系统示例"});
};

exports.register = function(req, res) {
    res.render("register", {title: "注册"})
};

exports.signIn = function(req,res) {
    var signInMark = req.body.signInMark;
    var pwd = req.body.pwd;
    var saveStatus = req.body.saveStates;
    userBO.validatePwd(signInMark,pwd,function(status,user) {
        switch(status) {
            case 0,2:
                res.json({"status":status});
                break;
            case 1:
                req.session.user = user;
                if(saveStatus) {
                    var maxAge = 60000*60*24*30;
                    res.cookie("identifier",user.identifier,{"maxAge":maxAge});
                    res.cookie("nickname",user.nickname,{"maxAge":maxAge});
                    res.cookie("token",user.token,{"maxAge":maxAge});
                } else {
                    res.clearCookie("nickname");
                    res.clearCookie("token");
                    res.clearCookie("identifier");
                }
                res.redirect("/index");
                break;
        }
    });
};

exports.singUp = function(req,res) {

};
