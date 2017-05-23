'use strict';


//连接数据库
var pool=require("./config");
//查找
var findModule = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM module', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

module.exports=function(){
    return {
        findModule:findModule
    }
}