var mysql = require("mysql");
var config = require("../config/dataconfig.json");

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: config.mysqlserver.port
});


var m = new Object();

var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};

m.query = function (sql, callback) {

    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        }
        else {
            conn.beginTransaction(function (err) {
                if (err) {
                    callback(err, null, null);
                } else {

                    conn.query(sql, function (qerr, vals, fields) {

                        if (qerr) {
                            conn.rollback(function () {//如果失败回滚

                            });
                        }
                        else {
                            conn.commit(function (err) {//提交事务
                                if (err) {
                                    qerr = err;
                                    conn.rollback(function () {

                                    });
                                }
                                else {
                                    console.log('success!');
                                }
                            });

                        }

                        //释放连接
                        conn.release();
                        //事件驱动回调
                        callback(qerr, vals, fields);

                    });

                }
            });
        }
    });
}
module.exports = query;
module.exports = m;