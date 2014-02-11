// mock data

var menus = [
    {
        'name': '按钮1',
        'children': [
            {
                'name': 'nav1',
                'url': 'url1'
            },
            {
                'name': 'nav2',
                'url': 'url2'
            },
            {
                'name': 'nav3',
                'url': 'url3'
            },
            {
                'name': 'nav4',
                'url': 'url4'
            },
            {
                'name': 'nav5',
                'url': 'url5'
            }
        ]
    },
    {
        'name': '按钮2',
        'url': 'url2'
    },
    {
        'name': '按钮3',
        'children': [
            {
                'name': 'nav1',
                'url': 'url1'
            },
            {
                'name': 'nav2',
                'url': 'url2'
            },
            {
                'name': 'nav3',
                'url': 'url3'
            }
        ]
    },
]

/**
 * index
 * @param req
 * @param res
 */
var logger = require("log4js").getLogger("routes.index");

exports.index = function (req, res) {
    res.render('index', { title: '用户系统范例', logo: 'MainPage', 'menus': menus});
    logger.debug("logger debug");
    logger.info("logger info");
};