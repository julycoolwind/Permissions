var should = require("should");
var user = require("../src/DBAccess/user");

describe("DBAccess.user", function () {
    before(function(done) {
        var userForUpdate = {"email":"update@admin.com","nickname":"userForUpdate","pwd":"12345"};
        var userForRemove = {"email":"remove@admin.com","nickname":"userForRemove","pwd":"12345"};
        var userForFind = {"email":"find@admin.com","nickname":"userForFind","pwd":"12345"};
        user.add(userForFind,function(findAdded) {
            should(findAdded).equal(true);
            user.add(userForRemove,function(removeAdded) {
                should(removeAdded).equal(true);
                user.add(userForUpdate,function(updateAdded) {
                    should(updateAdded).equal(true);
                    done();
                });
            });
        });
    });

    describe("add()", function () {
        it("需要创建一个新的user", function (done) {
            var u = {
                "email": "add@admin.com",
                "nickname": "userForAdd",
                "pwd": "12345"
            };
            user.add(u, function (added) {
                should(added).equal(true);
                done();
            });
        });
    });
    describe("update()", function () {
        it("需要根据传入的email修改user的其他属性", function (done) {
            var u = {
                "email":"update@admin.com",
                "nickname":"userForUpdate",
                "pwd":"12345",
                "identifier":"1",
                "token":"A"
            };
            user.update(u,function(updated) {
                should(updated).equal(true);
                done();
            });
        });
    });
    describe("removeOne()", function () {
        it("需要根据传入的email删除掉User", function (done) {
            var email = "remove@admin.com";
            user.removeOne(email,function(removed) {
                should(removed).equal(true);
                done();
            })
        });
    });
    describe("findOneByEmail()", function () {
        it("需要根据传入的Email查出User", function (done) {
            var email = "find@admin.com";
            user.findOneByEmail(email,function(found,user){
                should(found).equal(true);
                should(user).be.ok;
                should(user).have.property('email',email);
                done();
            });
        });
    });
    describe("findOneByNickname()", function () {
        it("需要根据传入的nickname查出User", function (done) {
            var nickname = "userForFind";
            user.findOneByNickname(nickname,function(found,user) {
                should(found).equal(true);
                should(user).be.ok;
                should(user).have.property('nickname',nickname);
                done();
            });
        });
    });
    describe("removeAll",function() {
        it("需要清空数据库中所有User", function(done) {
            user.removeAll(function(removed) {
                should(removed).equal(true);
                done();
            })
        })
    });

    after(function(done) {
        user.removeAll(function(removed) {
            should(removed).equal(true);
            done();
        });
    });
});