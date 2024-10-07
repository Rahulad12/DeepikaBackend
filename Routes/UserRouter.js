const express = require('express');
const router = express.Router();


const { authuser, createUser, GetallUser, DeleteUserById, UpdateUser,DeleteUser } = require('../controllers/UserController');



router.route('/register').post(createUser);
router.route('/login').post(authuser);
router.route('/getalluser').get(GetallUser);
router.route('/deleteuser').delete(DeleteUser);
router.route('/deleteuser/:id').delete(DeleteUserById);
router.route('/updateuser/:id').put(UpdateUser);

module.exports = router;