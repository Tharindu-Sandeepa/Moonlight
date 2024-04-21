const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const orderSchema = new mongoose.Schema({
    userID: { type: String, required: true,unique: true },
    orderID: { type: String, required: true ,unique: true},
    items: [{ type: String }],
    total: { type: Number },
    amount: { type: Number },
    date: { type: String },
    slip: {type: Object},
    status: {type: String},
});

module.exports = mongoose.model('Order', orderSchema);
