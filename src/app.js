
/**
 * Module dependencies.
 */

var express = require("express");
var routes = require("./routes");
var userControl = require("./routes/userControl");
var http = require("http");
var path = require("path");
var log4js = require("log4js");
var logger = require("./util/logger").logger("app");

var app = express();

// all environments
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.favicon());
//app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret:"permissions"}));
//log4js use
app.use(log4js.connectLogger(logger));

app.use(app.router);
app.use(require("less-middleware")({ src: path.join(__dirname, "public") }));
app.use(express.static(path.join(__dirname, "public")));

// development only
if ("development" == app.get("env")) {
  app.use(express.errorHandler());
}

app.get("/", routes.index);
app.get("/index",routes.index);
app.get("/login",userControl.login);
app.get("/register",userControl.register);
app.post("/verifyEmail",userControl.verifyEmail);
app.post("/signIn",userControl.signIn);
app.get("/signOut",userControl.signOut);
//app.post("/signUp",userControl.signUp)

http.createServer(app).listen(app.get("port"), function(){
  logger.debug("Express server listening on port " + app.get("port"));
});

module.exports = app;