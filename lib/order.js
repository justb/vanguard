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
var findOrder = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM `order`', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//有条件查找
var getOrderByUser = function(userid, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM `order` where userid=?', userid, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var getOrderById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM `order` where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//insert
var addOrder = function(order, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into `order` set userid=?, baseinfo=?, framework=?, template=?, component=?, modules=?, createtime=?', 
        [null,JSON.stringify(order.baseinfo), order.framework.name, order.template.name,JSON.stringify(order.component),JSON.stringify(order.module), new Date()], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//delete
var deleteOrder = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from `order` where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateOrder = function(id, order, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update `order` set baseinfo=?, framework=?, template=?, component=?, modules=? where id=?', 
        [JSON.stringify(order.baseinfo), order.framework.name, order.template.name,JSON.stringify(order.component),JSON.stringify(order.module),id], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};


//模块化
module.exports = function() {
    return {
        findOrder: findOrder,
        getOrderByUser: getOrderByUser,
        addOrder: addOrder,
        deleteOrder: deleteOrder,
        updateOrder: updateOrder,
        getOrderById: getOrderById
    };
};
