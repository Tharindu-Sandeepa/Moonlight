const Inquiry = require('../models/inquiriesModel');


// enter Inquiry
const enterInquiry = (req, res, next) => {
    
    const newInquiry = new Inquiry({
        name : req.body.name,
        email : req.body.email,
        message : req.body.message,

    });
    newInquiry.save()
        .then(response =>{  
            res.json({ response})  
        })
        .catch(error => {
            res.json({ error}) 
        })
}

//get
const getInquiry = (req, res, next) => {
    Inquiry.find()        // find()- the method that dispatch the data from db. the same as SQL SELECT function
        .then(response =>{  //promiss
            res.json({ response})  // return as a JSON object
        })
        .catch(error => {
            res.json({ error}) //assign the error to the message
        })
};
//delete

const deleteInquiry= (req, res, next) => {
    const id = req.body.id;
    Inquiry.deleteOne({_id:id})
    .then(response =>{  
        res.json({ response})  
    })
    .catch(error => {
        res.json({ error}) 
    });

    

}
exports.enterInquiry = enterInquiry;
exports.getInquiry = getInquiry;
exports.deleteInquiry = deleteInquiry;
