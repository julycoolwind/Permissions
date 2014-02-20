var request = require("supertest");
var app = require("../src/app");
var should = require("should");


var userBO = require("../src/business/userBO");
var user = require("../src/DBAccess/user");

describe("未登录请求", function () {
    before(function (done) {
        var signInUser = {"email": "signIn@admin.com", "nickname": "signInUser", "pwd": "12345", "identifier": "1", "token": "A"};
        user.add(signInUser, function (err,added) {
            added.should.equal(true);
            done();
        });
    });
    describe("静态页面请求", function () {
        it("/ and /index 首页", function (done) {
            request(app)
                .get("/")
                .expect(200)
                .end(function (err, res) {
                    if(err) {
                        throw err;
                    } else {
                        res.text.should.be.include("login");
                        res.text.should.be.not.include("欢迎");
                        done();
                    }
                });
        });
        it("/login 登录页面", function (done) {
            request(app).get("/login").expect(200, done);
        });
        it("/register 注册页面", function (done) {
            request(app).get("/register").expect(200, done);
        });
    });
    describe("ajax post 请求", function () {
        it("/signIn email登录", function (done) {
            request(app).post("/signIn")
                .send({"signInMark": "signIn@admin.com", "pwd": "12345", "saveStates": true})
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        res.body.status.should.equal(1);
                        done();
                    }
                });
        });
        it("/signIn nick登录", function (done) {
            request(app).post("/signIn")
                .send({"signInMark": "signInUser", "pwd": "12345", "saveStates": false})
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        res.body.status.should.equal(1);
                        done();
                    }
                });
        });
        describe("登录成功后", function () {
            describe("session中保存了对象",function() {
                var cookies = null;
                before(function (done) {
                    request(app).post("/signIn")
                        .send({"signInMark": "signInUser", "pwd": "12345", "saveStates": true})
                        .end(function (err, res) {
                            if (err) {
                                throw err;
                            } else {
                                res.body.status.should.equal(1);
                                cookies = res.headers["set-cookie"].pop().split(";")[0];
                                done();
                            }
                        });
                });
                it("验证登录状态", function (done) {
                    request(app).get("/index")
                        .set("cookie",cookies)
                        .end(function (err, res) {
                        if (err) {
                            throw err;
                        } else {
                            res.text.should.not.include("login");
                            res.text.should.include("欢迎");
                            done();
                        }
                    });
                });
            });
        });
    });
    after(function(done) {
        user.removeAll(function(err,removed) {
            removed.should.equal(true);
            done();
        });
    });
});

