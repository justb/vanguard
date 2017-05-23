'use strict';

var flieService = require('./file.js');
var fs=require("fs");
var path="D:\\nodej\\vanguard\\public\\resource\\";
var generator={
    express:function(order,callback){
        var time=Date.parse(new Date());
        flieService().copyfile(path+order.backend.name,path+order.backend.name+time,function(){

            //revise package.json

            var packagejson=require(path+order.backend.name+time+"\\package.json");
            console.log(packagejson.dependencies);
            packagejson.name=order.baseinfo.name;
            packagejson.description=order.baseinfo.description;
            packagejson.author=order.baseinfo.author;
            
            packagejson.dependencies[order.frontend.name]="";
            packagejson.dependencies[order.ui.name]="";
                //eval("json.dependencies."+item.id+"=''");
            
            fs.writeFile(path+order.backend.name+time+"\\package.json", JSON.stringify(packagejson).replace(/,/g,",\n"),  function(err) {
                     if (err) {
                         throw err;
                     }else{

                        //revise bower.json

                       


                        //zip file

                        flieService().zip(order.backend.name+time,path+order.backend.name+time,function(){
                            callback(order.backend.name+time);
                        })
                       
                     }
            });
            
        })
    }
}
module.exports=function(){
    return {generator:generator};
}