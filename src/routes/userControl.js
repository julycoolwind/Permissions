var userBO = require("../business/userBO");

exports.login = function(req, res){
    res.render("login", { title: "登录用户系统示例"});
};

exports.register = function(req, res) {
    res.render("register", {title: "注册"})
};

exports.signIn = function(req,res) {
    var signInMark = req.params.signInMark;
    var pwd = req.params.pwd;
    var saveStatus = req.params.isSave;
    userBO.validatePwd(signInMark,pwd,function(status,user) {
        switch(status) {
            case 0,2:
                res.json({"status":status});
                break;
            case 1:
                req.session.setAttribute("user",user);
                res.redirect("/index",{});
                break;
        }
    });
};
