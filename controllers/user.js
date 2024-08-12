const express = require('express');
const User = require('../models/user');

async function handleGetAllUsers(req, res){
    const data = await User.find({}); 
    return res.json(data); 
}
async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id);
    if(user){
        return res.json(user); 
    }
    else {
        return res.status(404).json({status:'error', message:'user not found'});    
    }
}

async function handleUpdateUserById(req,res){
    const id = req.params.id; 
    const result = await User.findByIdAndUpdate(id, {lastName:'changed'});
    return res.json({status:'success', message:'user updated successfully', data:result});
}

async function handleDeleteUserById(req,res){
    const id = req.params.id; 
    await User.findByIdAndDelete(id); 
    return res.json({status:'success', message:'user deleted successfully'});
}

async function handleAddUser(req,res){
    const body = req.body; 
    const result = await User.create({
        firstName:body.firstName, 
        lastName:body.lastName,
        email:body.email,
        jobTitle:body.jobTitle, 
        gender:body.gender
    }); 
    return res.status(201).json({status:'success', id:result._id}); 
}

module.exports = {
    handleGetAllUsers, 
    handleGetUserById, 
    handleUpdateUserById, 
    handleDeleteUserById, 
    handleAddUser
}