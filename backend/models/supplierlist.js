const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierlist = new Schema({
    supID : {type: Number, required: true, unique:true},
    supName: {type: String, required: true},
    Items: [{type: String, required: true}],
    description: {type: String, required: true},
    
});

const supList = mongoose.model('supList', supplierlist);

module.exports = supList;