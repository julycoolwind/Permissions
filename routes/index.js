
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express',logo:'MainPage','menus':['按钮1','按钮2','按钮3','按钮4'],'navis':['navi1','navi2','navi3','navi4']});
};