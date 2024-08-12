const express = require('express'); 
const router = express.Router(); 
const User = require('../models/user');

const {handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleAddUser} = require('../controllers/user');

router.route('/')
.get(handleGetAllUsers)
.post(handleAddUser);  

router.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;