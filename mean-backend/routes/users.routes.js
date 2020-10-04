const express = require('express'); 
const router = express.Router(); 
const userController = require('../controller/user.controller');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/groups/', userController.getGroups);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);
module.exports = router; 