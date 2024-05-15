const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true,  
    },
    weight: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    order: { 
        type: Number, 
        required: true,
        min: 0 
    },
    supplierName: {
         type: String,
          required: true, 
          min: 0 
    },
    cost: { 
        type: Number,
         required: true, 
         min: 0 
    },
    voucher: {
         type: Number,
          required: true, 
          min: 0 
    },
    date: { 
        type: Date,
         required: true 
    },
    special: {
         type: String, 
         required: true   
    }
});
const Material = mongoose.model('matone', materialSchema);
module.exports = Material;