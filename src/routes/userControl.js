var userBO = require("../business/userBO");

exports.login = function (req, res) {
    res.render("login", { title: "登录用户系统示例"});
};

exports.register = function (req, res) {
    res.render("register", {title: "注册"})
};

exports.signIn = function (req, res) {
    var signInMark = req.body.signInMark;
    var pwd = req.body.pwd;
    var saveStatus = req.body.saveStates;
    userBO.validatePwd(signInMark, pwd, function (status, user) {
        if (status == 1) {
            if (saveStatus == "true") {
                var maxAge = 60000 * 60 * 24 * 30;
                res.cookie("identifier", user.identifier, {"maxAge": maxAge});
                res.cookie("nickname", user.nickname, {"maxAge": maxAge});
                res.cookie("token", user.token, {"maxAge": maxAge});
            }
            req.session.user = user;
        }
        res.json({"status":status});
    });
};

exports.signOut = function(req, res) {
    req.session.destroy();
    res.clearCookie("nickname");
    res.clearCookie("token");
    res.clearCookie("identifier");
    res.redirect("index");
};

exports.verifyEmail = function(req,res) {
    var email = req.body.email;
    userBO.checkEmail(email,function(found) {
        res.json(found);
    });
};

exports.singUp = function (req, res) {
    var email = req.body.email;
    var nickname = req.body.nickname;
    var pwd = req.body.pwd;
    userBO.addUser({"email":email,"nickname":nickname,"pwd":pwd},function(added,user) {
        if(added) {
            req.session.user = user;
            res.redirect("index");
        } else {
            res.json({"error":true,"message":"注册失败，错误原因:"});
        }
    })
};
