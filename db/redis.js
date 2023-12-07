// //1.导入Redis
// const { createClient } = require('redis');

// // 在这里继续处理你的Redis操作

// const { REDIS_CONFIG } = require('../config/db');
// //2.建立Redis连接
// const client = createClient({ port: REDIS_CONFIG.port, host: REDIS_CONFIG.host });

// // 测试连接是否成功
// client.on("connect", () => {
//     console.log("Connected to Redis server!");
// });

// client.on('ready', () => {
//     console.log('Connected to Redis!');
// });

// client.on('error', err => console.log('Redis Client Error', err));

// module.exports = client;
