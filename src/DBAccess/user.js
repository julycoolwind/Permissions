var db = require("./connector").connect();
var logger = require("../util/logger").logger("DBAccess.user");

exports.add = function(user,callback) {
    db.user.insert(user,function(err,saved) {
        if(err || !saved) {
            callback(false);
            logger.error("插入新用户失败.位置:DBAccess/user.add;错误信息:"+err);
        } else {
            callback(true);
            logger.info("插入新用户成功:"+user.email);
        }
    });
};

exports.update = function(user,callback) {
    db.user.update({"email":user.email},user,function(err,updated) {
       if(err || !updated) {
           callback(false);
           logger.error("更新用户数据失败.位置:DBAccess/user.update;错误信息:"+err);
       } else {
           callback(true);
           logger.info("更新用户数据成功:"+user.email)
       }
    });
};

exports.removeOne = function(email,callback) {
    db.user.remove({"email":email},function(err,removed) {
       if(err || !removed) {
           callback(false);
           logger.error("删除用户数据失败.位置:DBAccess/user.removeOne;错误信息:"+err);
       } else {
           callback(true);
           logger.info("删除用户数据成功:"+email);
       }
    });
};

exports.removeAll = function(callback) {
    db.user.remove(function(err,removed) {
        if(err || !removed) {
            callback(false);
            logger.error("删除所有用户数据失败.位置:DBAccess/user.removeAll;错误信息:"+err);
        } else {
            callback(true);
            logger.info("删除所有用户数据成功.");
        }
    })
};

exports.findOneByEmail = function(email,callback) {
    db.user.findOne({"email":email},function(err,user) {
       if(err) {
           callback(false,null);
           logger.error("查询用户数据失败.位置:DBAccess/user.findOneByEmail;错误信息:"+err);
       } else if(user == null){
           callback(false,null);
           logger.info("查询用户数据成功:未找到 user : email = "+email);
       } else {
           callback(true,user);
           logger.info("查询用户数据成功: user : "+email);
       }
    });
};

exports.findOneByNickname = function(nickname,callback) {
    db.user.findOne({"nickname":nickname},function(err,user) {
        if(err) {
            callback(false,null);
            logger.error("查询用户数据失败.位置:DBAccess/user.findOneByNickname;错误信息:"+err);
        } else if(user == null){
            callback(false,null);
            logger.info("查询用户数据成功:未找到 user : nickname = "+user.nickname);
        } else {
            callback(true,user);
            logger.info("查询用户数据成功: user : "+user.nickname);
        }
    });
};