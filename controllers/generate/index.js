'use strict';
var flieService = require('../../lib/file.js');
var orderService = require('../../lib/order.js')
var generator=require('../../lib/generator.js');
var json=require('../../package.json');
var fs=require('fs');
var url = require('url');
var exec = require('child_process').exec;
var mongoose = require('mongoose');
var book = require('../../models/module').order;
mongoose.connect('mongodb://localhost/hello');

exports.download = function(req, res){
  var path = 'public/upload/file.txt';  // 文件存储的路径

  // filename:设置下载时文件的文件名，可不填，则为原名称
  res.download(filepath, filename); 
};
module.exports = function(router) {

	//路由器
	//路径匹配
	router.post('/', function(req, res) {
         flieService().create(req.body.order,function(){
             console.log(req.body.order)
             generator().generator[req.body.order.framework.name](req.body.order,function(){
                 res.json("success");
             });
             
         });		
	});
    router.get('/download/:id', function(req, res) {
        orderService().getOrderById(req.params.id,function(err,results){
            if(err){
                res.json(err);
            }else{
                // results[0].baseinfo=JSON.parse(results[0].baseinfo);
                // results[0].modules=JSON.parse(results[0].modules);
                // results[0].component=JSON.parse(results[0].component);
                generator().generator[results[0].framework](results[0],function(path){
                    console.log(path+".zip");
                    path=path+".zip"
                    res.download(path,"express.zip",function(err,data){
                        console.log(err,data);
                        if(err){
                            console.log(err);
                        }else{
                            console.log("ok");
                        }
                    });
                });
            }
            
        })

        

        
            //  console.log(req.body.order)
            //  generator().generator[req.body.order.framework.name](req.body.order,function(){
            //      res.json("success");
            //  });
             
         	
	});

    router.post('/download', function(req, res) {
        var newBook=new book(req.body.order);
        newBook.save(function(err,doc){
            if(err){
                res.json(err);
            }else{
                generator().generator[req.body.order.backend.name](req.body.order,function(path){
                    console.log(path+".zip");
                    path=path+".zip"
                    // res.download(path,"express.zip",function(err,data){
                    //     console.log(err,data)
                    //     if(err){
                    //         console.log(err);
                    //     }else{
                    //         console.log("ok");
                    //     }
                    // });

                    res.json("resource/"+path);
                });
            }
        })
        
            
        
         	
	});
}