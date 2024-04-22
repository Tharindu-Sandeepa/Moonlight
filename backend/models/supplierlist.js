const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierlist = new Schema({
    supID : Number,
    supName: String,
    Items: [String],
    description: String,
    
});

const supList = mongoose.model('supList', supplierlist);

module.exports = supList;