//const { response } = require('./app');
const supItem = require('../models/supItem');




const getSupItem = (req, res, next) => {
    supItem.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        });
};

const addSupItem = (req, res, next) => {
    const { itemID, item, quantity, description } = req.body;
    


    const newSupItem = new supItem({
        itemID: itemID,
        item: item,
        quantity: quantity,
        description:description
    });

    newSupItem.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ message: error });
        });
};



const updateSupItem = (req, res, next) => {
    const { _id, itemID, item, quantity, description} = req.body; 
    supItem.updateOne({ _id: _id}, { 
        $set: { 
            itemID: itemID,
            item: item,
            quantity: quantity,
            description: description,
        }
    })
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.json({ message: error })
    });
}


const deleteSupItem = (req, res, next) => {
    const _id = req.body._id; 
    supItem.deleteOne({ _id: _id})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        });
}


exports.getSupItem = getSupItem;
exports.addSupItem = addSupItem;
exports.updateSupItem = updateSupItem;
exports.deleteSupItem = deleteSupItem;

