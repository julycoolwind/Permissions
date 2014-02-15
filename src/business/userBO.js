var user = require("../DBAccess/user");

/**
 * 通过cookies校验登录
 * @param nickname
 * @param identifier
 * @param token
 * @param callback(status) 0-强制密码登录；1-登录成功；2-其他设备cookies登录；3-其他设备密码登录
 */
exports.validateCookies = function (nickname, identifier, token, callback) {
    user.findOneByNickname(nickname, function (found, user) {
        if (found && user) {
            if (!user.identifier) {
                callback(0,null);
            } else if (user.identifier == identifier && user.token == token) {
                callback(1,user);
            } else if (user.identifier == identifier) {
                callback(2,null);
            } else {
                callback(3,null);
            }
        } else {
            callback(0);
        }
    });
};


/**
 * 通过密码校验登录
 * @param nickname
 * @param email
 * @param pwd
 * @param callback(status) 0-密码错误；1-登录成功；2-用户名不存在
 */
exports.validatePwd = function (mark, pwd, callback) {
    user.findOneByEmail(mark, function (emailFound, emailUser) {
        user.findOneByNickname(mark, function (nicknameFound, nicknameUser) {
            if (emailFound) {
                if(pwd == emailUser.pwd) {
                    callback(1,emailUser);
                } else {
                    callback(0,null);
                }
            } else if (nicknameFound) {
                if(pwd == nicknameUser.pwd) {
                    callback(1,nicknameUser);
                } else {
                    callback(0,null);
                }
            } else {
                callback(2,null);
            }
        });
    });
};
