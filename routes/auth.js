const express = require('express');
const router = express.Router();
const User = require("../models/User");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// require('dotenv').config();

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = new User({ username, password, email });
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('now')
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('here')
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });

    }
})



module.exports = router;