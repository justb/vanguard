'use strict';


//连接数据库
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: 'wei4799',
    port: 3307,
    database: 'vanguard'
});

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