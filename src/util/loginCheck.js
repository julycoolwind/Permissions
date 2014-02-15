var userBO = require("../business/userBO");

exports.checkLoginStatus = function(req,res,callback) {
    var user = req.session.user;
    if(user) {
        callback(1,user);
        return;
    }
    var nickname = req.cookies.nickname;
    var identifier  = req.cookies.identifier;
    var token = req.cookies.token;
    if(nickname && identifier && token) {

        userBO.validateCookies(nickname,identifier,token,function(status,user) {
            if(status == 1) {
                callback(1,user);
            } else {
                callback(status,null);
            }
        });
    } else {
        callback(0,null);
    }
};