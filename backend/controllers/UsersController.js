const Users = require('../models/User');

//getUsers
const getUsers = (req,res,next)=>{
    Users.find()
    .then(response=>{
        res.json({response})
    })
    .catch(erorr=>{
        res.json({erorr: error})
    })
};

// addUser
const addUser = (req, res, next) => {
    const { name, username, email, tp, password, type } = req.body;

    const user = new Users({
       
        name: name,
        username: username,
        email: email,
        tp: tp,
        password: password,
        type: type
    });

    user.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

//update user
const updateUser = (req, res, next) => {
    const { id, name, email, tp, username,password,type } = req.body; // get multiple fields at once

    Users.updateOne(
        { _id: id },
        {
            $set: {
                name: name,
                email: email,
                tp: tp, 
                username: username, 
                password:password,
                type:type
               
            },
        }
    )
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};


// delete user
const deleteUser = (req, res, next) => {
    const { id } = req.body; // Retrieve _id from the request body

    Users.deleteOne({ _id: id }) // Use _id to delete the user
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error: error });
        });
};

exports.getUsers=getUsers;
exports.addUser =addUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;





