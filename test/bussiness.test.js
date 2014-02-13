var should = require("should");
var userBO = require("../src/business/userBO");
var user = require("../src/DBAccess/user");

describe("userBO",function() {
    describe("validateCookies",function() {
        var redirectUser,signInSuccessUser,otherCookiesUser,otherSignInUser;
        before(function(done) {
            redirectUser = {"email":"redirect@admin.com","nickname":"redirectUser"};
            signInSuccessUser = {"email":"signInSuccess@admin.com","nickname":"signInSuccessUser","token":"A","identifier":"1"};
            otherCookiesUser = {"email":"otherCookies@admin.com","nickname":"otherCookiesUser","token":"B","identifier":"1"};
            otherSignInUser = {"email":"otherSignIn@admin.com","nickname":"otherSignInUser","token":"B","identifier":"2"};
            user.add(redirectUser,function(redirectAdded) {
                should(redirectAdded).equal(true);
                user.add(signInSuccessUser,function(signInSuccessAdded) {
                    should(signInSuccessAdded).equal(true);
                    user.add(otherCookiesUser,function(otherCookiesAdded) {
                        should(otherCookiesAdded).equal(true);
                        user.add(otherSignInUser,function(otherSignInAdded) {
                            should(otherSignInAdded).equal(true);
                            done();
                        });
                    });
                });
            });
        });

        it("返回强制密码登录",function(done) {
            userBO.validateCookies(redirectUser.nickname,"1","A",function(status) {
                status.should.equal(0);
                done();
            })
        });
        it("返回登录成功",function(done) {
            userBO.validateCookies(signInSuccessUser.nickname,"1","A",function(status) {
                status.should.equal(1);
                done();
            });
        });
        it("返回其他设备cookies登录",function(done) {
            userBO.validateCookies(otherCookiesUser.nickname,"1","A",function(status) {
                status.should.equal(2);
                done();
            });
        });

        it("返回其他设备密码登录",function(done) {
            userBO.validateCookies(otherSignInUser.nickname,"1","A",function(status) {
                status.should.equal(3);
                done();
            });
        });

        after(function(done) {
            user.removeAll(function(removed) {
                should(removed).equal(true);
                done();
            });
        });
    });
});

describe("invitationCodeBO",function() {
    describe("createInvitationCode",function() {
        it("根据传入邮箱地址email与数字x创建x个邀请码",function() {

        });
    });
    describe("findInvitationCodeByEmail",function() {
        it("根据邮箱地址查询邀请码，返回array",function() {

        });
    });
    describe("setInvitationUsed",function() {
        it("设置邀请码状态为已使用",function() {

        });
    });
    describe("setInvitationLapsed",function() {
        it("设置邀请码状态为已失效",function() {

        });
    });
    describe("setAllInvitationLapsed",function() {
        it("设置未使用的邀请码为已失效",function() {

        });
    });
});