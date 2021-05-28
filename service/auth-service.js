const userDAO = require('../DAO/user-dao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constant = require('../utils/constant');


// const authDAO = require('../DAO/user-dao');
const authService = {
    login: (payload) => { 

        console.log('payload inside service from controller', payload);

        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()
            userDAO.isExist(payload.email).then(async (result) => {
                console.log(result);
                // resolve({"service got hit":result});
                if (!result) {
                    reject("please register");
                }
                console.log("hi im authservice", payload.password, result.password);

                let match = await bcrypt.compare(payload.password, result.password) //used to check password
                console.log(match, payload.password, result.password);
                if (match) {
                    let data = JSON.parse(JSON.stringify(result)); //cloning coping objects
                    delete data.password;
                    let token = jwt.sign(data, constant.ENDPOINT.JWT.JWT_SCRET);
                    console.log(token);
                    data['token'] = token;

                    resolve(data);
                } else {
                    reject("invalid password");
                }

            }).catch(error => {
                reject(error);
            })

        })


    }
}



module.exports = authService;