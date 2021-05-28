

const CONSTANT = {
  ROLE: ['EMPLOYEE', 'ADMIN'],
  ENDPOINT: {
    USER: {
      CREATE_USER: "/createUser",
      LOGIN: '/auth'
    },
    LEAVE: {
      LEAVE_APPLING: "/leaveAppling",
      LEAVE_REJECT: "/leaveReject",
      LEAVE_APPROVAL: "/leaveApproval",
      LEAVE_COUNTBULK: "/leaveCountBulk",
      LEAVE_COUNT_BY_ID: "/leaveCountByID"
    },
    JWT: {
      JWT_SCRET: "SREeBangaram" 
    }
    //   LEAVE:{
    //     DEFAULT:0

    //   }

  }
}
module.exports = CONSTANT;