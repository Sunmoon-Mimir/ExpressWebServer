const seq = require('./seq');
//1.测试配置是否正确
seq.authenticate()
    .then(() => {
        console.log('数据库连接成功！');
    })
    .catch(err => {
        console.error('数据库连接失败：', err);
    });

// 2.执行同步方法，创建表
seq.sync()
    .then(() => {
        console.log('表创建成功');
    })
    .catch(err => {
        console.error('表创建失败：', err);
    })