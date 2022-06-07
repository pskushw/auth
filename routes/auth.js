const express = require("express");
const router = express.Router();
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { validateRegister, validateLogin } = require("../validation");

//Regiser New user
router.post("/register", async (req, res) => {
    //Let validate the data before we make a user
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.json({ user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    //Let validate the data before we make a user
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email does not exist");
    //Check if password is correct

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    
    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token); 
});
module.exports = router;
