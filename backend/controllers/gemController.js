const Gem = require('../models/gemModel');

//get gems 
const getGem = (req, res, next) => {
    Gem.find()        // find()- the method that dispatch the data from db. the same as SQL SELECT function
        .then(response =>{  //promiss
            res.json({ response})  // return as a JSON object
        })
        .catch(error => {
            res.json({ error}) //assign the error to the message
        })
};

//add gem function

const addGem = (req, res, next) => {
    const newGem = new Gem({
        id: req.body.id,
        name: req.body.name,
        color : req.body.color,
        price : req.body.price,
        weight: req.body.weight,
        category: req.body.category,
        voucherNo: req.body.voucherNo,
        supplierId: req.body.supplierId,
    });

    newGem.save()
        .then(response =>{  
            res.json({ response})  
        })
        .catch(error => {
            res.json({ error}) 
        });
}

//update function

const updateGem = (req, res, next) => {
    const  { id , name, color, price, weight, category ,voucherNo, supplierId}= req.body;
    Gem.updateOne({id:id},{$set: {name:name, color:color, price:price, weight:weight, category:category,voucherNo:voucherNo, supplierId: supplierId  }})
    .then(response =>{  
        res.json({ response})  
    })
    .catch(error => {
        res.json({ error}) 
    });

}


//delete function

const deleteGem = (req, res, next) => {
    const id = req.body.id;
    Gem.deleteOne({id:id})
    .then(response =>{  
        res.json({ response})  
    })
    .catch(error => {
        res.json({ error}) 
    });

    

}




exports.getGem = getGem;
exports.addGem = addGem;
exports.updateGem = updateGem;
exports.deleteGem = deleteGem;






