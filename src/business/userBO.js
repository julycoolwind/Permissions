var user = require("../DBAccess/user");

/**
 * 通过cookies校验登录
 * @param nickname
 * @param identifier
 * @param token
 * @param callback(status) 0-强制密码登录；1-登录成功；2-其他设备cookies登录；3-其他设备密码登录
 */
exports.validateCookies = function (nickname, identifier, token, callback) {
    user.findOneByNickname(nickname, function (err,found, user) {
        if (found && user) {
            if (!user.identifier) {
                callback(err,0,null);
            } else if (user.identifier == identifier && user.token == token) {
                callback(err,1,user);
            } else if (user.identifier == identifier) {
                callback(err,2,null);
            } else {
                callback(err,3,null);
            }
        } else {
            callback(err,0,null);
        }
    });
};


/**
 * 通过密码校验登录
 * @param mark
 * @param pwd
 * @param callback(status) 0-密码错误；1-登录成功；2-用户名不存在
 */
exports.validatePwd = function (mark, pwd, callback) {
    user.findOneByEmail(mark, function (err,emailFound, emailUser) {
        user.findOneByNickname(mark, function (err,nicknameFound, nicknameUser) {
            if (emailFound) {
                if(pwd == emailUser.pwd) {
                    callback(err,1,emailUser);
                } else {
                    callback(err,0,null);
                }
            } else if (nicknameFound) {
                if(pwd == nicknameUser.pwd) {
                    callback(err,1,nicknameUser);
                } else {
                    callback(err,0,null);
                }
            } else {
                callback(err,2,null);
            }
        });
    });
};

exports.checkEmail = function(email,callback) {
    user.findOneByEmail(email,function(err,found) {
        callback(err,found);
    });
};

exports.newUser = function(u,callback) {
    user.add(u,function(err,added) {
        if(added) {
            callback(err,true,u);
        } else {
            callback(err,false,null);
        }
    });
};
