const express = require('express');
const router = express.Router();
const userController = require('../../controllers/ControllerUser');

//url create - POST (/api/product)
router.post('/', userController.createUser);
//url read all - GET (/api/product)
router.get('/', userController.allUser);
//url read one-detail - GET (/api/product/:id)
router.get('/:id', userController.userDetail);
//url update - PUT (/api/product/:id)
router.put('/:id', userController.updateUser);
//url delete - DELETE (/api/product/:id)
router.delete('/:id', userController.removeUser);


module.exports = router;