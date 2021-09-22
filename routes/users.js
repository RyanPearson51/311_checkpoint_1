const express = require('express');

const router = express.Router();

const controller = require('../controllers/users')

//GET users
//show all users
router.get('/users', controller.listUsers)

//GET users/:id
//show specific user by id
router.get('/users/:id', controller.showUser)

//POST users
//create a new user
router.post('/users', controller.createUser)

//update users
//update a single user in the database
router.put('/users/:id', controller.updateUser)

//delete user
//delete a user from the database
router.delete('/users/:id', controller.deleteUser)


module.exports = router;