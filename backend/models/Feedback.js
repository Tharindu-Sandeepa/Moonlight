const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    id: {type: String},
    User_ID: {type: String},
    name: {type: String},
    email: {type: String},
    Jewelry_ID: {type: String},
    Jewelry_Name: {type: String},
    rating: {type: String},
    feedback: {type: String}
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
