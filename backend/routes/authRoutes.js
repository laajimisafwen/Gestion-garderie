const express = require('express');
const router = express.Router();
const User = require('../models/Parent');
const Admin = require("../models/Admin");
const bcrypt = require('bcrypt'); // biblio cryptage de password

// le parent creer un compte
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json('Error registering the user');
    }
});

// ajouter un nouveau admin
router.post('/add-admin', async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = new Admin({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await admin.save();
        res.status(201).json('Admin added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json('Error adding the admin');
    }
});

// le parent se conncte
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({
            $or: [{ username: login }, { email: login }]
        });

        if (!user) {
            return res.status(400).json('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error during login');
    }
});

// connection de l'admin
router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json('Admin not found');
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }
        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error logging in');
    }
});




module.exports = router;
