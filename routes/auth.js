const express = require('express');
const router = express.Router();
const User = require('../model/User');
const {validateRegister} = require('../validation');

router.post('/register', async (req, res) => {
    //Let validate the data before we make a user
    const {error} = validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;