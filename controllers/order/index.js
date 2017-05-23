'use strict';
var orderService = require('../../lib/order.js');
module.exports = function(router) {

	//路由器
	//路径匹配
	router.post('/add', function(req, res) {
         orderService().addOrder(req.body.order,function(err,results){
             if (err) {
				return res.json(err);
			}
			//返回json体
			res.json(results);
         });
	});
	router.post('/update', function(req, res) {
         orderService().updateOrder(req.body.id,req.body.order,function(err,results){
             if (err) {
				return res.json(err);
			}
			//返回json体
			res.json(results);
         });
	});
	router.post('/delete', function(req, res) {
         orderService().deleteOrder(req.body.id,function(err,results){
             if (err) {
				return res.json(err);
			}
			//返回json体
			res.json(results);
         });
	});
	router.post('/get', function(req, res) {
		if(req.session.user.id==req.body.user.id&&req.session.user.name==req.body.user.name&&req.session.user.password==req.body.user.password&&req.session.user.email==req.body.user.email){
			orderService().getOrderByUser(req.body.user.id,function(err,results){
				if (err) {
					return res.json(err);
				}
				//返回json体
				res.json(results);
			});
		}
	});
	router.get('/:id', function(req, res) {
		
		orderService().getOrderById(req.params.id,function(err,results){
			if (err) {
				return res.json(err);
			}
			//返回json体
			res.json(results);
		});
		
	});
}