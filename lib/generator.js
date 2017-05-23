'use strict';

var flieService = require('./file.js');
var fs=require("fs");
var i=0;
var path="C:\\Users\\lwei\\nodejs\\vanguard\\resource\\";
var generator={
    Kraken:function(order,callback){
        i++;
        flieService().copyfile(path+order.framework,path+order.framework+i,function(){

            //revise package.json

            var packagejson=require(path+order.framework+i+"\\package.json");
            console.log(packagejson.dependencies);
            packagejson.name=order.baseinfo.name;
            packagejson.description=order.baseinfo.description;
            packagejson.author=order.baseinfo.author;
            order.modules.forEach(function(item){
                packagejson.dependencies[item.name]="^"+item.version;
                //eval("json.dependencies."+item.id+"=''");
            });
            fs.writeFile(path+order.framework+i+"\\package.json", JSON.stringify(packagejson).replace(/,/g,",\n"),  function(err) {
                     if (err) {
                         throw err;
                     }else{

                        //revise bower.json

                        var bowerjson=require(path+order.framework+i+"\\bower.json");
                        order.component.forEach(function(item){
                            bowerjson.dependencies[item.name]="^"+item.version;
                        });
                        fs.writeFile(path+order.framework+i+"\\bower.json", JSON.stringify(bowerjson).replace(/,/g,",\n"),  function(err) {
                                if (err) {
                                    throw err;
                                }else{
                                    //add style

                                    if(order.template=='Vanguard Style'){
                                        flieService().copyfile(path+'VanguardStyle',path+order.framework+i+"\\public\\templates\\VanguardStyle\\",function(){
                                            flieService().zip(order.framework+i,path+order.framework+i,function(){
                                                callback(path+order.framework+i);
                                            })
                                        })
                                    }else{

                                        //zip file

                                        flieService().zip(order.framework+i,path+order.framework+i,function(){
                                            callback(path+order.framework+i);
                                        })
                                    }
                                    
                                }
                        });
                     }
            });
            
        })
    }
}
module.exports=function(){
    return {generator:generator};
}