const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const orderSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    orderID: { type: String, required: true, unique: true },
    items: [{ type: String }],
    total: { type: Number, min: 0 }, // Ensure total is a positive number
    amount: { type: Number, min: 0 }, // Ensure amount is a positive number
    date: { type: Date, default: Date.now }, // Use Date type for date field
    slip: { type: Object }, // You may need to define specific validation for slip
    status: { type: String, enum: ['Confirm', 'Processing', 'Completed'] } // Ensure status is one of the specified values
});

module.exports = mongoose.model('Order', orderSchema);

