var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'vanguard'
});

module.exports=pool;