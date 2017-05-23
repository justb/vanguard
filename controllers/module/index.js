'use strict';
var moduleService = require('../../lib/module.js');
module.exports = function(router) {

	//路由器
	//路径匹配
	router.get('/', function(req, res) {
        console.log(moduleService);
         moduleService().findModule(function(err,results){
             if (err) {
				return res.json(err);
			}
			//返回json体
			res.json(results);
         });
        
        
		
	});
}