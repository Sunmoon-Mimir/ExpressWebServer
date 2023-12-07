const User = require('../db/model/user');
async function getUser(userName, passWord) {
    if (passWord) {
        try {
            let result = await User.findOne({
                where: {
                    username: userName,
                    password: passWord
                }
            })

            return result['dataValues'];
        }
        catch (e) {
            return [];
        }

    } else {
        let result = await User.findAll({
            where: {
                username: userName
            }
        })
        return result;
    }
}

async function insertUser(username, password, gender) {
    let result = await User.create({
        username: username,
        password: password,
        gender: gender
    })
    console.log({ result });
    return result;
}

module.exports = {
    getUser,
    insertUser
}