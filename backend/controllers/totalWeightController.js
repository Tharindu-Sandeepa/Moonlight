const totalWeight = require('../models/totalWeightModel');


const getTotalWeight = (req,res,next) => {
    totalWeight.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });

};

const addtotalWeight = (req,res,next) => {
    const totalWeight = new totalWeight({
       
        name: req.body.name,
         totalWeight: req.body.totalWeight,
       

    });
    totalWeight.save()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });


}

exports.getTotalWeight = getTotalWeight;
exports.addtotalWeight = addtotalWeight;
