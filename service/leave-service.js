const leaveDAO = require('../DAO/leave-dao');
const bcrypt = require('bcrypt');


const leaveService = {
    leaveAppling: (user, payload) => { //user will come from authentication 

        console.log('payload inside service from controller', payload);

        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()
            payload['empId'] = user.empId; //get empid from authentication req.user and set new property empId to payload 
            // coming from payload.
            leaveDAO.leave(payload).then((result) => {
                resolve('successfully appied for Leave');
            }).catch(error => {
                reject(error);
            }) 

        })
    },
    leaveApproval: (user, payload) => {

        console.log('payload inside service from controller', payload, user.role);



        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()
            // payload['empId']= user.empId;

            if (user.role != 'ADMIN') {
                console.log('u r not admin');
                return reject('you are not Authorized ');
            }
            leaveDAO.leaveApproval(payload).then((result) => {
                console.log(result);


                resolve(result);
            }).catch(error => {
                reject(error);
            })


        })
    },
    leaveReject: (user, payload) => {

        console.log('payload inside service from controller', payload, user.role);

        return new Promise((resolve, reject) => { //NOTE:in service we will use promise(resolve,reject),then() and catch()

            if (user.role != 'ADMIN') {
                console.log('u r not admin');
                return reject('you are not Authorized ');
            }
            leaveDAO.leaveReject(payload).then((result) => {
                console.log(result);


                resolve('Leave Rejected ');
            }).catch(error => {
                reject(error);

            })
        })

    }


}


module.exports = leaveService;