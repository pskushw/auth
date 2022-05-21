const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/register', async (req, res) => {
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