var db = require("./connector").connect();
var logger = require("../util/logger").logger("DBAccess.module");

exports.add = function(module,callback) {
    db.module.insert(module,function(err,added) {
        if(err && !added) {
            callback("插入新模块失败",false);
            logger.error("插入新模块失败.位置:DBAccess/module.add;错误信息:"+err);
        } else {
            callback("",true);
            logger.info("插入新模块成功:"+module.name);
        }
    });
};

exports.update = function(module,callback) {
    db.module.update({"name":module.name},module,function(err,updated) {
        if(err || !updated) {
            callback("更新模块数据失败",false);
            logger.error("更新模块数据失败.位置:DBAccess/module.update;错误信息:"+err);
        } else {
            callback("",true);
            logger.info("更新模块数据成功:"+module.name)
        }
    });
};


exports.removeOne = function(name,callback) {
    db.module.remove({"name":name},function(err,removed) {
        if(err || !removed) {
            callback("删除模块数据失败",false);
            logger.error("删除模块数据失败.位置:DBAccess/module.removeOne;错误信息:"+err);
        } else {
            callback("",true);
            logger.info("删除模块数据成功:"+name);
        }
    });
};

exports.removeAll = function(callback) {
    db.user.remove(function(err,removed) {
        if(err || !removed) {
            callback("删除所有模块数据失败",false);
            logger.error("删除所有模块数据失败.位置:DBAccess/module.removeAll;错误信息:"+err);
        } else {
            callback("",true);
            logger.info("删除所有模块数据成功.");
        }
    })
};

exports.findAll = function(callback) {
    db.module.find(function(err,modules) {
        if(err) {
            callback("查询所有模块数据失败",false,null);
            logger.error("查询所有模块数据失败.位置:DBAccess/module.findAll;错误信息:"+err);
        } else if(modules == null){
            callback("",false,null);
            logger.info("查询所有模块数据成功:未找到 modules");
        } else {
            callback("",true,modules);
            logger.info("查询所有模块数据成功: modules : "+modules.length);
        }
    });
};

exports.findOneByName = function(name,callback) {
    db.module.findOne({"name":name},function(err,module) {
        if(err) {
            callback("查询模块数据失败",false,null);
            logger.error("查询所有数据失败.位置:DBAccess/module.findOneByName;错误信息:"+err);
        } else if(module == null){
            callback("",false,null);
            logger.info("查询模块数据成功:未找到 module: "+name);
        } else {
            callback("",true,module);
            logger.info("查询所有模块数据成功: module : "+module.name);
        }
    });
};