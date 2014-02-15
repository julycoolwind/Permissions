var request = require("supertest");
var app = require("../src/app");

describe("未登录请求",function() {
    describe("静态页面请求",function() {
        it("/ and /index 首页",function(done) {
            request(app).get("/").expect(200,done);
        });
        it("/login 登录页面",function(done) {
            request(app).get("/login").expect(200,done);
        });
        it("/register 注册页面",function(done) {
            request(app).get("/register").expect(200,done);
        });
    });
    describe("ajax post 请求",function() {
        it("/signIn 登录",function() {
            request(app).post("/signIn").send({});
        });
        it("/signUp 注册新用户",function() {

        });
    })
});

