'use strict';


//连接数据库
var pool=require("./config");

//查找
var findUser = function(callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('SELECT * FROM user', function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//有条件查找
var getUserById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //条件参数id
        connection.query('SELECT * FROM user where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//insert
var addUser = function(name,password,email, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        //两个参数
        connection.query('insert into user set name=?, password=?, email=?', 
        [name,password,email], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//delete
var deleteUser = function(id, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('delete from user where id=?', id, function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

//update
var updateUser = function(id, name,password,email, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('update user set name=?, password=?, email=? where id=? ', 
        [id, name,password,email], function(err, results) {
            if (err) {
                return callback(err);
            }
            connection.release();
            return callback(null, results);
        });
    });
};

var userLogin = function(name, password, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err);
        }
        connection.query('select * from user where name=? and password=? ', 
        [name,password], function(err, results) {
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
        findUser: findUser,
        getUserById: getUserById,
        addUser: addUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        userLogin: userLogin
    };
};
