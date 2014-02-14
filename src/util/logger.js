var log4js = require("log4js");

//log4js config
log4js.configure({
    "appenders": [
        {
            "type": "console"
        },
        {
            "type": "dateFile",
            "filename": "src/log/permissions.log",
            "pattern": "-yyyy-MM-dd",
            "alwaysIncludePattern": false
        }
    ],
    "replaceConsole": true
});

exports.logger = function(moduleName) {
    var logger = log4js.getLogger(moduleName);
    logger.setLevel("DEBUG");
    return logger;
};
