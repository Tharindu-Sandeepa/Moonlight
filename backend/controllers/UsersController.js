const Users = require('../models/User');
const bcrypt = require('bcrypt');
const { sendWelcomeEmail } = require('./emailController');
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
 // Send a welcome email to the user
 sendWelcomeEmail({ recipient_email: email, username: username });

};

const updateUser = async (req, res, next) => {
    const { id, name, email, tp, username, password, type } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        Users.updateOne(
            { _id: id },
            {
                $set: {
                    name: name,
                    email: email,
                    tp: tp, 
                    username: username, 
                    password: hashedPassword, 
                    type: type
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


//changepassword

const changepassword = async (req, res, next) => {
    try {
        // Destructure email and password from req.body
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Update the user's password
        await Users.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        // Send success response
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


exports.changepassword = changepassword;

exports.getUsers=getUsers;
exports.addUser =addUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;





