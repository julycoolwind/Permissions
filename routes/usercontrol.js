/**
 * SignIn
 * @param req
 * @param res
 */

exports.signIn = function(req, res){
    res.render('signIn', { title: '用户系统范例'});
};

exports.register = function(req, res) {
    res.render('register', {title: '注册'})
};