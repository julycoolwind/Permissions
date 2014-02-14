var mongojs = require("mongojs");

exports.connect = function () {
    var databaseurl = "permissions";
    var collections = ["user"];
    return mongojs.connect(databaseurl,collections);
};
