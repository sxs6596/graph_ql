const express = require('express'); 
const app = express(); 

const PORT = 8000; 

const fs = require('fs'); 
const users = require('./MOCK_DATA.json'); 
const User = require('./models/user'); 
const {mongodbConnect} = require('./connection');
const userRouter = require('./routes/user');
// router usage. 
app.use('/api/users', userRouter); 
// middleware.
app.use(express.urlencoded({extended:false})); // middleware - 1 


// mongodb connection
mongodbConnect('mongodb://localhost:27017/userDB').then(()=>console.log('mongodb connected')).catch((err)=>console.log(err));


app.listen(PORT,()=>console.log(`server listening on the port ${PORT}`));