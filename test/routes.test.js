var request = require("supertest");
var app = require("../src/app");

describe("GET request",function() {
    it("未登录请求'/'",function(done) {
        request(app).get("/").expect(200,done);
    });
    it("请求一些奇怪的地址 /sis",function(done) {
        request(app).get("/sis").expect(200,done);
    });
});

