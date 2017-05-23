'use strict';
var componentService = require('../../lib/component.js');
module.exports = function(router) {

	//路由器
	//路径匹配
	router.get('/', function(req, res) {
         componentService().findComponent(function(err,results){
             if (err) {
				return res.json(err);
			}
			//返回json体
			res.json(results);
         });
        
        
		
	});
}