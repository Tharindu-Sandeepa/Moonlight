const supplier = require('../models/supplier');

const getSup = (req, res) => {
    supplier.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const addSup = (req, res) => {
    const { supID, orderID, itemID, item, quantity, date ,status} = req.body;

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    const newSupplier = new supplier({
        supID,
        orderID,
        itemID,
        item,
        quantity,
        date: parsedDate,
        status,
    });

    newSupplier.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const updateSup = (req, res) => {
    const { _id, orderID, itemID, item, quantity, status } = req.body;
    supplier.findByIdAndUpdate(_id, {
        orderID,
        itemID,
        item,
        quantity,
        status,
    })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.status(500).json({ message: error.message });
    });
};


const deleteSup = (req, res) => {
    const { _id } = req.body;
    supplier.deleteOne({ _id })
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};


module.exports = {
    getSup,
    addSup,
    updateSup,
    deleteSup
};
