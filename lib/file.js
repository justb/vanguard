'use strict';

var fs=require('fs');
var archiver = require('archiver');

var zip=function(name,path,callback){

    var output = fs.createWriteStream(path+'.zip');
    var archive = archiver('zip');
    output.on('close', function() {
        callback();
    });
    archive.on('error', function(err){
        throw err;
    });

    archive.pipe(output);
    archive.bulk([
        {
            src: ['**','.*'],
            dest: name+'/' ,
            cwd: path+'\\',
            expand: true
        }
    ]);
    archive.finalize();
    
    
}

var copyfile=function(oldd,newd,callback){
    fs.exists(newd,function(exists){
        var exec = require('child_process').exec,child;
        if(exists){
            child = exec("rd/S/Q "+newd,function(err,out){
                if(err){
                    return console.log(err);
                }else{
                    fs.mkdir(newd,function(err){
                        if(err){
                            return console.log(err);
                        }else{
                            child = exec("xcopy "+oldd+" "+newd+" /e",function(err,out){
                                if(err){
                                    return console.log(err);
                                }else{
                                    callback();
                                }
                            })
                        }
                    })
                }
            })
        }else{
            fs.mkdir(newd,function(err){
                if(err){
                    return console.log(err);
                }else{
                    child = exec("xcopy "+oldd+" "+newd+" /e",function(err,out){
                        if(err){
                            return console.log(err);
                        }else{
                            callback();
                        }
                    })
                }
            })
        }
    })
}

var create=function(order,callback){
        fs.exists('public/vanguard/test.txt',function(exists){
            if(exists){
            var exec = require('child_process').exec,child;
            child = exec("rd/S/Q C:\\Users\\lwei\\nodejs\\vanguard\\public\\vanguard",function(err,out) { 
                if(err){
                    return console.log(err);
                }else{
                    fs.mkdir('public/vanguard',function(err){
                        if(err){
                            return console.log(err);
                        }else{
                            fs.writeFile('public/vanguard/' + "test.txt", order.baseinfo, function(err) {
                                if(err) {
                                    return console.log(err);
                                }else{
                                    return callback();
                                }
                            });
                        }
                    });
                }
            })
            }else{
                fs.mkdir('public/vanguard',function(err){
                    if(err){
                        return console.log(err);
                    }else{
                        fs.writeFile('public/vanguard/' + "test.txt", order.baseinfo, function(err) {
                            if(err) {
                                return console.log(err);
                            }else{
                                return callback();
                            }
                        });
                    }
                });
            }
            
        }); 
    }


module.exports = function() {
    return {
        zip: zip,
        create: create,
        copyfile:copyfile
    };
};