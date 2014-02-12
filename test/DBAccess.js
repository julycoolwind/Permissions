var assert = require('assert');
var should = require('should');
var user = require('../src/DBAccess/user');

describe('DBAccess.user', function () {
    describe('add()', function () {
        it('需要创建一个新的user对象', function (done) {
            var u = {
                "email": "admin@admin.com",
                "nickname": "administrator",
                "pwd": "administrator"
            };
            user.add(u, function (added) {
                should(added).equal(true);
                done();
            });
        });
    });
    describe('update()', function () {
        it('需要根据传入的email修改user对象的其他属性', function () {

        });
    });
    describe('deleteOne()', function () {
        it('需要根据传入的email删除掉对象', function () {

        });
    });
    describe('findOneByEmail()', function () {
        it('需要根据传入的Email查出User对象', function () {

        });
    });
    describe('findOneByNickname()', function () {
        it('需要根据传入的nickname查出User对象', function () {

        });
    });
});