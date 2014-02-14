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
                callback(0);
            } else if (user.identifier == identifier && user.token == token) {
                callback(1);
            } else if (user.identifier != identifier) {
                callback(3);
            } else {
                callback(2);
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
exports.validatePwd = function (nickname, email, pwd, callback) {
    user.findOneByEmail(email, function (emailFound, emailUser) {
        user.findOneByNickname(nickname, function (nicknameFound, nicknameUser) {
            if (emailFound) {
                if(pwd == emailUser.pwd) {
                    callback(1);
                } else {
                    callback(0);
                }
            } else if (nicknameFound) {
                if(pwd == nicknameUser.pwd) {
                    callback(1);
                } else {
                    callback(0);
                }
            } else {
                callback(2);
            }
        });
    });
};