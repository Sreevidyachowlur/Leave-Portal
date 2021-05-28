const userDAO = require('../DAO/user-dao');
const userService = {
    create: (payload) => {

        console.log('payload inside service from controller', payload);
        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()
            userDAO.emailExist(payload.email, payload.phone).then((result) => {
                console.log('newly registered email', result);
                // resolve(result);
                if (result == null) {
                    userDAO.create(payload).then((result) => {
                        resolve('data got stored successfully');
                    }).catch(error => {
                        reject(error);
                    })
                } else {
                    reject('email already exist');
                }


            }).catch(error => {
                reject(error);
            }) 

        })

    },
    leaveCountBulk: (condition) => {



        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()

            userDAO.leaveCountBulk().then((result) => {
                console.log(result);


                resolve('Leave count updated ');
            })

        }).catch(error => {
            reject(error);
        })

    },

    leaveCountOne: (payload) => {



        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()

            userDAO.leaveCountOne(payload).then((result) => {
                console.log(result);


                resolve('Leave count updated ');
            })

        }).catch(error => {
            reject(error);
        })

    }

}



module.exports = userService;