const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalWeightlSchema = new Schema({
   
    name: { 
        type: String, 
        // required: true,  
    },
    totalWeight: { 
        type: Number,   
        // required: true, 
        // min: 0 
    }

});

const totalWeight = mongoose.model('totalWeight', totalWeightlSchema);
module.exports = totalWeight;