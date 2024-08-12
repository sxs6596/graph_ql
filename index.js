const express = require('express'); 
const app = express(); 

const PORT = 8000; 
const mongoose = require('mongoose');
const fs = require('fs'); 
const users = require('./MOCK_DATA.json'); 

app.use(express.urlencoded({extended:false})); // middleware - 1 

mongoose.connect('mongodb://localhost:27017/userDB').then(()=>console.log('mongodb connected')).catch(()=>console.log('mongodb not got connected.'));
const userSchema = new mongoose.Schema({
    firstName:{
        type:String, 
        required:true
    }, 
    lastName:{
        type:String, 
        required:true
    }, 
    email:{
        type:String, 
        required:true,
        unique:true
    },
    jobTitle:{
        type:String
    }, 
    gender:{
        type:String
    }
    
},{timestamps:true}); 

const User = mongoose.model('user',userSchema); 



app.route('/api/users')
.get((req,res)=>{
    res.json(users); 
})
.post( async (req,res)=>{
    const body = req.body; 
    // users.push({...body, id:users.length+1});

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
    //     return res.json({status : 'success', id:users.length}); 
    // })
    const result = await User.create({
        firstName:body.firstName, 
        lastName:body.lastName,
        email:body.email,
        jobTitle:body.jobTitle, 
        gender:body.gender
    }); 

    return res.status(201).json({status:'success', id:result._id}); 
})
.patch((req,res)=>{
    const body = req.body; 
    const id = body.id; 
    const index = users.findIndex(user=>user.id == id); 
    if(index == -1){
        return res.json({status:'error', message:'user not found'}); 
    }
    users[index] = {...users[index], ...body}; 
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status : 'success', id:id}); 
    })
})
.delete((req,res)=>{
    const id = req.body.id; 
    const index = users.findIndex(user=>user.id == id); 
    if(index == -1){
        return res.json({status:'error', message:'user not found'}); 
    }
    users.splice(index,1); 
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
        return res.json({status : 'success', id:id}); 
    })
})

app.get('/api/users/:id',(req,res)=>{
    const id = req.params.id; 
    const user = users.find(user=>user.id === parseInt(id)); 
    if(user){
        return res.json(user); 
    }
})




app.listen(PORT,()=>console.log(`server listening on the port ${PORT}`));