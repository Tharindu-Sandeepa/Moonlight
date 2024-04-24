const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  gemSchema = new Schema({ 

    id:Number,
    name:String,
    color: String,
    price:String,
    weight: String,
    category: String,
    voucherNo: String,
    supplierId: String,

});

// create a  new model for gems
const Gem = mongoose.model('Gem', gemSchema);
module.exports= Gem;



