const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/leave-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => {
  console.log("successfully connected to DataBase");
});



module.exports = mongoose;
 