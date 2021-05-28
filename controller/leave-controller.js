var express = require('express');
var route = express.Router();

const userService = require('../service/user-service');
const leaveService = require('../service/leave-service');
const CONSTANT = require('../utils/constant');
const authentication = require('../middleware/authentication');




route.post(CONSTANT.ENDPOINT.LEAVE.LEAVE_APPLING, authentication, (req, res) => {
    console.log(req.body);
    leaveService.leaveAppling(req.user, req.body).then(result => { //NOTE: in controller we will use only then() and catch()
        res.send(result);
    }).catch(error => {
        res.send(error);
    })

}),

    route.put(CONSTANT.ENDPOINT.LEAVE.LEAVE_APPROVAL, authentication, (req, res) => { //here constant is file name
        console.log(req.body);
        leaveService.leaveApproval(req.user, req.body).then(result => { //NOTE: in controller we will use only then() and catch()
            console.log('leave-controller result', result);
            res.send(result);
        }).catch(error => {
            console.log('leave-controller err', error);
            res.send(error);
        })

    }),
  


    route.put(CONSTANT.ENDPOINT.LEAVE.LEAVE_REJECT, authentication, (req, res) => {
        console.log(req.body);
        leaveService.leaveReject(req.user, req.body).then(result => { //NOTE: in controller we will use only then() and catch()
            res.send(result);
        }).catch(error => {
            res.send(error);
        }) 
 
    })

module.exports = route;