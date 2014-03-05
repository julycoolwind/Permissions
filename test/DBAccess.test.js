var should = require("should");
var user = require("../src/DBAccess/user");
var module = require("../src/DBAccess/module");

describe("DBAccess.user", function () {
    before(function(done){
        var userArray = [{"email":"update@admin.com","nickname":"userForUpdate","pwd":"12345"},
         {"email":"remove@admin.com","nickname":"userForRemove","pwd":"12345"},
         {"email":"find@admin.com","nickname":"userForFind","pwd":"12345"}];
        userArray.forEach(function(auser){
            user.add(auser,function(err,state){
                should(state).equal(true);
            });
        });
        done();
    });

    describe("add()", function () {
        it("需要创建一个新的user", function (done) {
            var u = {
                "email": "add@admin.com",
                "nickname": "userForAdd",
                "pwd": "12345"
            };
            user.add(u, function (err,added) {
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
            user.update(u,function(err,updated) {
                should(updated).equal(true);
                done();
            });
        });
    });
    describe("removeOne()", function () {
        it("需要根据传入的email删除掉User", function (done) {
            var email = "remove@admin.com";
            user.removeOne(email,function(err,removed) {
                should(removed).equal(true);
                done();
            })
        });
    });
    describe("findOneByEmail()", function () {
        it("需要根据传入的Email查出User", function (done) {
            var email = "find@admin.com";
            user.findOneByEmail(email,function(err,found,user){
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
            user.findOneByNickname(nickname,function(err,found,user) {
                should(found).equal(true);
                should(user).be.ok;
                should(user).have.property('nickname',nickname);
                done();
            });
        });
    });
    describe("removeAll",function() {
        it("需要清空数据库中所有User", function(done) {
            user.removeAll(function(err,removed) {
                should(removed).equal(true);
                done();
            })
        })
    });

    after(function(done) {
        user.removeAll(function(err,removed) {
            should(removed).equal(true);
            done();
        });
    });
});

describe("DBAccess.invitationCode",function () {
    describe("add",function() {
        it("创建新的邀请码",function() {

        });
    });
    describe("update",function() {
        it("修改邀请码状态",function() {

        });
    });
    describe("findOneByCode",function() {
        it("通过code查询邀请码状态",function() {

        });
    });
});

//TODO
describe("DBAccess.organization",function() {
    describe("add",function() {
        it("创建新的组织",function() {

        });
    });
    describe("update",function() {
        it("根据组织的ID更新组织其他属性",function() {

        });
    });
    describe("safeRemove",function() {
        it("安全删除组织与职位，只允许删除无子节点，无关联用户的组织",function() {

        });
    });
    describe("forceRemove",function() {
        it("删除组织与该组织下的子节点，包括所有职位，角色",function() {

        });
    });
});

//TODO
describe("DBAccess.post",function() {

});

//TODO
describe("DBAccess.permission",function() {

});

describe("DBAccess.module",function() {
    var addModule = {"name":"addModule","url":"/addModule"};
    var updateModule = {"name":"updateModule","url":"/updateModule"};
    var updatedModule = {"name":"updateModule","features":[{"name":"fu1","url":"/fu1"},{"name":"fu2","url":"/fu2"}]};
    var removeModule = {"name":"removeModule","url":"/removeModule"};
    var tempModule1 = {"name":"module1","features":[{"name":"f1","url":"/f1"},{"name":"f2","url":"/f2"}]};
    var tempModule2 = {"name":"module2","features":[{"name":"f21","url":"/f21"},{"name":"f22","url":"/f22"}]};
    var findModule = {"name":"findModule","features":[{"name":"ff1","url":"/ff1"},{"name":"ff2","url":"/ff2"}]};

    before(function(done) {
        module.add(updateModule,function() {
            module.add(removeModule,function() {
                module.add(tempModule1,function() {
                    module.add(tempModule2,function() {
                        module.add(findModule,function() {
                            done();
                        })
                    });
                });
            });
        })
    });
    describe("插入新module",function() {
        it("插入一个新module并且没err",function(done) {
            module.add(addModule,function(err,added) {
                added.should.equal(true);
                err.should.be.not.ok;
                done();
            });
        });
    });
    describe("更新module",function() {
        it("更新module，增加features",function(done) {
            module.update(updatedModule,function(err,updated) {
                updated.should.equal(true);
                err.should.be.not.ok;
                done();
            });
        });
    });
    describe("删除module",function() {
        it("删除指定name 的 module",function(done) {
            module.removeOne("removeModule",function(err,removed) {
                removed.should.equal(true);
                err.should.be.not.ok;
                done();
            });
        });
    });
    describe("获取module列表",function() {
        it("获取所有module",function(done) {
            module.findAll(function(err,found,modules) {
                found.should.equal(true);
                err.should.be.not.ok;
                modules.length.should.be.greaterThan(0);
                done();
            });
        });
    });
    describe("获取单个module",function() {
        it("通过name获取module",function(done) {
            module.findOneByName("findModule",function(err,found,m) {
                found.should.equal(true);
                err.should.be.not.ok;
                m.features.length.should.be.equal(2);
                done();
            });
        });
    });
});