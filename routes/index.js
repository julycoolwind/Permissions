
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '用户系统范例',logo:'MainPage','menus':['按钮1','按钮2','按钮3','按钮4','5','6','7','8','9'],'navis':['navi1','navi2','navi3','navi4']});
};