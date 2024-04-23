const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    id: {type: Number,required: true},
    User_ID: {type: Number,required: true},
    name: {type: String,required: true},
    email: {type: String,required: true,match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/},
    Jewelry_ID: {type: Number,required: true},
    Jewelry_Name: {type: String,required: true},
    rating: {type: String,required: true,min: 1,max: 5},
    feedback: {type: String,required: true}
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
