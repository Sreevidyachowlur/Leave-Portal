const userModel = require('../model/user-model');
const utilities = require('../utils/utilities');
const CONSTANT = require('../utils/constant');
const bcrypt = require('bcrypt');
const saltRounds = 10; //salt value can be 8 or more than that,if it increases more than 10 
// it take more time to exicute..default salt value is 10.10 rounds it do for encode 

const userDAO = {

    create: async (payload) => {

        let password = await bcrypt.hash(payload.password, saltRounds);
        payload.password = password;



        console.log('payload inside dao from service', payload);
        return new userModel({ //NOTE:its connected with DB so,DAO indirectly wrapped with promise 
            name: payload.name,
            dob: payload.dob,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            password: payload.password, //password updated with hash and also stored in DB aswell
            role: payload.role,
            empId: utilities.getUniqueId()

            // createdAt:Date.now(), //the fields which r in schema as a default no need to write inside dao,no 
            // need to pass from postman
            // leaveCount:0

        }).save();


    },
    getByCondition: (condition) => {
        return userModel.findOne(condition);
    },
    emailExist: (email, phone) => {
        return userModel.findOne({ email: email, phone: phone })
    },
    isExist: (email) => {
        return userModel.findOne({ email: email })

    },

    leaveCountBulk: (condition) => {


        return userModel.updateMany({ "role": "EMPLOYEE" }, { $set: { "leaveCount": 10 } })


    },
    leaveCountOne: (payload) => {

        console.log('payload inside dao from service', payload);
        return userModel.updateOne({ "empId": payload.empId }, { $set: { "leaveCount": 15 } })


    }
 
    // leaveIdExist: (leaveID, empId) => {
    //     return userModel.findOne({ leaveID: leaveID, empId: empId })
    // }


}
module.exports = userDAO;