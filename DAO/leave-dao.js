const leaveModel = require('../model/leave-model');
const utilities = require('../utils/utilities');
const userModel = require('../model/user-model');

const leaveDAO = {
    leave: (payload) => {

        console.log('payload inside dao from service', payload);
        return leaveModel({ //NOTE:its connected with DB so,DAO indirectly wrapped with promise 
            leaveDiscription: payload.leaveDiscription,
            leaveType: payload.leaveType,
            leaveID: utilities.leaveUniqueId(),
            fromDate: payload.fromDate,
            toDate: payload.toDate,

            empId: payload.empId

            // createdAt:Date.now(), //the fields which r in schema as a default no need to write inside dao,no 
            // need to pass from postman
            // leaveCount:0

        }).save();


    },
    leaveApproval: async (payload) => {

        console.log('payload inside dao from service', payload);
        let userData = await userModel.findOne({ "empId": payload.empId });
        let leaveData = await leaveModel.findOne({ "leaveID": payload.leaveID })
        if (userData) {
            console.log("userdata", userData);
            let leaveApplied = Math.round((leaveData.toDate - leaveData.fromDate) / (1000 * 60 * 60 * 24));
            let remainingLeaves = userData.leaveCount - leaveApplied;
            await userModel.updateOne({ "empId": payload.empId }, { $set: { "leaveCount": remainingLeaves } });
            let finalResponse = { status: "Success" };
            if (remainingLeaves < 0) {
                finalResponse["message"] = `your leave has been approved. you have exceeded your leavecount.so you will have ${(-remainingLeaves)} paid leaves `;
            } else {
                finalResponse["message"] = `your leave has been approved. `;
            }
            await leaveModel.updateOne({ "leaveID": payload.leaveID }, { $set: { "status": payload.status } });
            return finalResponse;
        }



    },

    leaveReject: (payload) => {

        console.log('payload inside dao from service', payload);
        return leaveModel.updateOne({ "leaveID": payload.leaveID }, { $set: { "status": payload.status } })


    } 




    // ,
    // emailExist: (email, phone) => {
    //     return leaveModel.findOne({ email: email, phone: phone })
    // }


}
module.exports = leaveDAO;