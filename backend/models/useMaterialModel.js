const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const useMaterialSchema = new Schema({
    useId: {
        type: Number,
        required: true,
       
    },
    useName: {
        type: String,
        required: true,
       
    },
    useWeight: {
        type: Number,
        required: true,
        min: 0,
        
    },
    useDate: {
        type: Date,
        required: true,
    },
    useReason: {
        type: String,
        required: true,
      
    }
});

const useMaterial = mongoose.model('usematone', useMaterialSchema);

module.exports = useMaterial;
