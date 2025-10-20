const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/ControllerOrder');

//url create - POST (/api/product)
router.post('/', orderController.createOrder);
// //url read all - GET (/api/product)
router.get('/', orderController.getAllOrders);
// //url read one-detail - GET (/api/product/:id)
router.get('/:id', orderController.getOrderDetail);
// //url update - PUT (/api/product/:id)
router.put('/:id', orderController.updateOrder);
// //url delete - DELETE (/api/product/:id)
router.delete('/:id', orderController.deleteOrder);

module.exports = router;