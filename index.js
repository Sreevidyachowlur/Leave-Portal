const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());


// app.post('/',(req,res)=>{
// console.log( req.body);
// res.send('success');
// })

require('./db');

app.use('/users', require('./controller/user-controller'));
app.use('/auth', require('./controller/auth-controller'));
app.use('/leave', require('./controller/leave-controller'));

app.listen(3000, () => {
  console.log('listening the port 3000 ')
})
 




