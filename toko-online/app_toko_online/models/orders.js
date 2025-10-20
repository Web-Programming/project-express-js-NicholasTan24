const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        priceAtOrder: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: [
                'Pending', 
                'Processing', 
                'Shipped', 
                'Delivered', 
                'Canceled'
            ],
            default: 'Pending'
        },
        orderDate:{
            type: Date,
            default: Date.now,
        }
    }]
});
const Order = mongoose.model('Order', OrderSchema,'orders');
module.exports = Order;