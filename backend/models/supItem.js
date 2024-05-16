const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supItemSchema = new Schema({
    itemID: { type: Number, required: true, unique: true },
    item: { type: String, required: true },
    quantity: { type: String, required: true },
    description: { type: String, required: true },
    
});

const supItem = mongoose.model('supItem', supItemSchema);

module.exports = supItem;
