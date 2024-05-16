const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supSchema = new Schema({
    supID : {type: String, required: true, unique: true},
    orderID: {type: String, required: true},
    itemID: {type: String, required: true},
    item: {type: String, required: true},
    quantity: {type: String, required: true},
    date: { type: Date, default: Date.now },
    status: {type: String, required: true},
    
});

const supplier = mongoose.model('supplier', supSchema);

module.exports = supplier;