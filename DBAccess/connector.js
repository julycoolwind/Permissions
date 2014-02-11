var fs = require('fs');

exports.connect = function () {
    var databaseurl = "permissions";
    var collections = ["user"];
    return require("mongojs").connect(databaseurl, collections);
};