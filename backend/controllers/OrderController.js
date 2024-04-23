const Orders = require('../models/Order');
const bcrypt = require('bcrypt');
//getOrders
const getOrders = (req,res,next)=>{
    Orders.find()
    .then(response=>{
        res.json({response})
    })
    .catch(erorr=>{
        res.json({erorr: error})
    })
};

// addOrder
const addOrder = (req, res, next) => {
    const { userID, orderID, items, total, amount, date, slip, status } = req.body;

    const order = new Orders({
    
        userID: userID,
        orderID: orderID,
        items: items,
        total: total,
        amount: amount,
        date: date,
        slip: slip,
        status: status
    });

    order.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

const updateOrder = async (req, res, next) => {
    const { id, userID, orderID, items, total, amount, date, slip, status } = req.body;

        Orders.updateOne(
            { _id: id },
            {
                $set: {
                    userID: userID,
                    orderID: orderID,
                    items: items,
                    total: total,
                    amount: amount,
                    date: date,
                    slip: slip,
                    status: status
                },
            }
        )
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });

};

// delete order
const deleteOrder = (req, res, next) => {
    const { id } = req.body; // Retrieve _id from the request body

    Orders.deleteOne({ _id: id }) // Use _id to delete the user
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

exports.getOrders=getOrders;
exports.addOrder =addOrder;
exports.updateOrder=updateOrder;
exports.deleteOrder=deleteOrder;





