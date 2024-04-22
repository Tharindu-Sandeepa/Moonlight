const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supOrdSchema = new Schema({
    supOrdId : {type: Number, required: true, unique: true},
    supName: {type: String, required: true},
    type: {type: String, required: true},
    quantity: {type: String, required: true},
    supID: {type: Number},
    matID: [{type: Number}],
    gemID: [{type: Number}],
    description: {type: String},
    status : {type: String, required: true},
});

const supOrder = mongoose.model('supOrder', supOrdSchema);

module.exports = supOrder;