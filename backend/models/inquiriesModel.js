const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creation of a new schema for inquiries
const inquirySchema = new Schema({

    name:String,
    email:String,
    message:String,
});


// create a new model for Inquires

const Inquiry = mongoose.model('Inquiry',inquirySchema);
module.exports = Inquiry;