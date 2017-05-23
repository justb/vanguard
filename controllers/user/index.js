'use strict';
var userService = require('../../lib/user.js');
module.exports = function(router) {

	//路由器
	//路径匹配


	router.post('/login', function(req, res) {
         userService().userLogin(req.body.name,req.body.password,function(err,results){
             if (err) {
                 
				return res.json(err);
			}
			//返回json体
            if(results[0]){
                req.session.user=results[0];
                console.log(req.session);
                res.json(results[0]);
            }
            
			//res.json(results);
         });
	});
    router.get('/logout', function(req, res) {
         req.session.user=null;
         res.json(1);
	});
    router.post('/isLogin', function(req, res) {
         if(req.session.user.id==req.body.user.id&&req.session.user.name==req.body.user.name&&req.session.user.password==req.body.user.password&&req.session.user.email==req.body.user.email){
             res.json(1);
         }else{
            res.json(0);
         }
	});
    router.get('/session', function(req, res) {
         res.json(req.session.user);
	});
}