const utilities = {
  getUniqueId: () => {
    return 'EMP-' + Math.floor(
      Math.random() * (999 - 100) + 100
    )


  },
  leaveUniqueId: () => {
    return 'LEAVE-' + Math.floor(
      Math.random() * (999 - 100) + 100
    )


  }
}

module.exports = utilities; 
