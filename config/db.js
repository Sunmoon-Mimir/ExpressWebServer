let MYSQL_CONFIG;

if (process.env.NODE_ENV === 'dev') {
    MYSQL_CONFIG = {
        databaseName: 'demo',
        databaseUserName: 'root',
        databasePassword: '123456',
        conf: {
            host: '127.0.0.1',
            port: 3306,
            dialect: 'mysql',//告诉sequelize当前要操作的数据库类型
            user: 'root',
            pool: {
                max: 5,//至多有多少个连接
                min: 0,//至少有多少个连接
                idle: 10000,//当前连接多久没有操作就断开
                acquire: 30000//多久没有获取到连接就断开
            }
        }
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379,
    }
} else if (process.env.NODE_ENV === 'pro') {
    MYSQL_CONFIG = {
        databaseName: 'demo',
        databaseUserName: 'root',
        databasePassword: '123456',
        conf: {
            host: '127.0.0.1',
            port: 3306,
            dialect: 'mysql',//告诉sequelize当前要操作的数据库类型
            user: 'root',
            pool: {
                max: 5,//至多有多少个连接
                min: 0,//至少有多少个连接
                idle: 10000,//当前连接多久没有操作就断开
                acquire: 30000//多久没有获取到连接就断开
            }
        }
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379,
    }
}

module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
};