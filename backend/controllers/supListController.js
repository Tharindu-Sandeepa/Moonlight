//const { response } = require('./app');
const supList = require('../models/supplierlist');



const getSupplier = (req, res, next) => {
    supList.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        });
};

const addSupplier = (req, res, next) => {
    const newSupplier = new supList({
        supName: req.body.supName,
        Items: req.body.Items,
        description: req.body.description,
    });
    newSupplier.save()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        });
}
const updateSupplier = (req, res, next) => {
    const { _id, supName, Items, description} = req.body; // Change supID to _id
    supList.updateOne({ _id: _id}, { 
        $set: { 
            supName: supName,
            Items: Items,
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

const deleteSupplier = (req, res, next) => {
    const _id = req.body._id; // Change supID to _id
    supList.deleteOne({ _id: _id})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        });
}
/*
const updateSupplier = (req, res, next) => {
    const { supID, supName, Items, description} = req.body;
    supList.updateMany({ supID: supID}, { 
        $set: { 
            supName: supName,
            Items: Items,
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


const deleteSupplier = (req, res, next) => {
    const supID =req.body.supID;
    supList.deleteOne({ supID: supID})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ message: error })
        });
}*/


exports.getSupplier = getSupplier;
exports.addSupplier = addSupplier;
exports.updateSupplier = updateSupplier;
exports.deleteSupplier = deleteSupplier;

