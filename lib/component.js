'use strict';


var pool=require("./config");

//查找
var findComponent = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM component', function(err, results) {
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
        findComponent:findComponent
    }
}