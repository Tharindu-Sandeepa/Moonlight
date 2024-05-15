const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newMaterialSchema = new Schema({
    id: { 
        type: String, 
        // required: true, 
        // unique: true 
    },
    name: { 
        type: String, 
        // required: true,  
    },
    weight: { 
        type: Number,   
        // required: true, 
        // min: 0 
    }

});

const newMaterial = mongoose.model('newMaterial', newMaterialSchema);
module.exports = newMaterial;
