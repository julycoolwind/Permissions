
var logger = require("../util/logger").logger("routes.index");
var userBO = require("../business/userBO.js");
/**
 * index
 * @param req
 * @param res
 */

exports.index = function (req, res) {
    var nickname = req.cookies.nickname;
    var menus = null;
    if(nickname) {
        var token = req.cookies.token;
        var identifier = req.cookies.identifier;
        userBO.validateCookies(nickname,identifier,token,function(status) {
            switch(status) {
                case 0:
                    logger.debug("强制输入口令");
                break;
                case 1:
                    logger.debug("登录成功");
                break;
                case 2:
                    logger.debug("其他设备cookie登录");
                break;
                case 3:
                    logger.debug("其他设备口令登录");
                break;
            }
        });
    }
    res.render("index", { "title": "用户系统范例", "logo": "MainPage", "menus":menus});
    res.cookie("nickname","Administrator",{maxAge:1000*60});
    res.cookie("identifier","001",{maxAge:1000*60});
    res.cookie("token","1",{maxAge:1000*60});
};