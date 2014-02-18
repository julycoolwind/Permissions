
var logger = require("../util/logger").logger("routes.index");
var loginCheck = require("../util/loginCheck");
var userBO = require("../business/userBO.js");
/**
 * index
 * @param req
 * @param res
 */

exports.index = function (req, res) {
    loginCheck.checkLoginStatus(req,res,function(status,user) {
        var menus = null;
        var nickname = null;
        if(status == 1) {
            //TODO find modules and features
            //TODO parse to menus json
            nickname = user.nickname;
        }
        res.render("index",{"title":"用户系统示例","menus":menus,"nickname":nickname});
//        res.json({"title":"用户系统示例","menus":[{"name":"def","url":"abc"}]});
    });
};