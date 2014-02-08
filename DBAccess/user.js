var db = require("./connector").connect();

exports.add = function(user,callback) {
    db.user.insert(user,function(err,saved) {
        if(err || !saved) {
            callback(false);
            console.error('插入新用户失败.位置:DBAccess/user.add;错误信息:'+err.error_message());
        } else {
            callback(true);
            console.log('插入新用户成功:'+user.email);
        }
    });
}

exports.update = function(user,callback) {
    db.user.update(user,function(err,updated) {
       if(err || !updated) {
           callback(false);
           console.error('更新用户数据失败.位置:DBAccess/user.update;错误信息:'+err.error_message());
       } else {
           callback(true);
           console.log('更新用户数据成功:'+user.email)
       }
    });
}

exports.deleteOne = function(email,callback) {
    db.user.remove({'email':email},function(err,removed) {
       if(err || !removed) {
           callback(false);
           console.error('删除用户数据失败.位置:DBAccess/user.update;错误信息:'+err.error_message());
       } else {
           callback(true);
           console.log('删除用户数据成功:'+email);
       }
    });
}

exports.findOne = function(email,callback) {
    db.user.findOne({'email':email},function(err,user) {
       if(err) {
           callback(false,null);
           console.error('查询用户数据失败.位置:DBAccess/user.update;错误信息:'+err.error_message());
       } else if(user == null){
           callback(true,null);
           console.log('查询用户数据成功:未找到 user : email = '+email);
       } else {
           callback(true,user);
           console.log('查询用户数据成功: user : '+email);
       }
    });
}