const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
const express = require('express');
const router = express.Router();
const { redisSet, redisGet } = require('../db/redis');
const { registerUser, loginCheck } = require('../controller/userController');

/*
如何存储用户的登录状态？
1.客户端存储 cookie
2.服务端存储 session
3.保存的登录状态也需要加密保存

cookie的特点
在服务端和客户端中都可以对cookie进行crud
每次客户端发送request，都会自动把当前域名的cookie自动发送给服务端
*/

/*1.客户端存储登录状态的不足
1.cookie存储有大小限制
2.存储的内容根据业务需求有更多的存储要求
3.存储在客户端的信息需要加密，否则有暴露的风险
但如果所有信息都加密，服务器还需要存储存储加密的映射关系
否则也无法得知加密信息的内容
综上所述，为了提示数据安全性，以及存储更多内容
我们可以在服务端session存储登录状态*/

/*2.session如何存？
1.给每个用户分配一个无关紧要的值作为标识
2.在服务端定义一个全局变量为session容器
3.将用户的唯一标识作为key，登录后给容器的key添加登录状态信息
*/

// const getCookieExpires = () => {
//     let date = new Date();
//     date.setTime(date.getDate() + (24 * 60 * 60 * 1000));
//     return date.toGMTString();
// }

router.post('/login', async (req, res, next) => {
    let result = await loginCheck(req.body);
    // if (result.code === 200) {
    //     req.session.username = result.data.username;
    //     req.session.password = result.data.password;
    //     req.session.gender = result.data.gender;
    // }
    return res.json(result);
})
router.post('/register', async (req, res, next) => {
    let result = await registerUser(req.body);
    return res.json(result);
})

router.get('/test', (req, res, next) => {
    console.log(req.session);
    if (req.session.username) {
        res.end('login ok');
    } else {
        res.end('login error')
    }
})
module.exports = router;