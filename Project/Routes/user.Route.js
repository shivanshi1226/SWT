const express = require("express");
const Model = require("../Model/user.Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
    const { email, name, password, role } = req.body;
    try {
        const hash = await bcrypt.hash(password, 5);
        const user = new Model({
            email: email,
            name: name,
            password: hash,
            role: role
        });
        await user.save();
        res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error during registration", error: err.message });
    }
});

userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Model.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const AccessToken = jwt.sign({ _id: user._id, name: user.name, role: user.role },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );
            const RefreshToken = jwt.sign({ name: user.name, role: user.role },
                process.env.SECRET_KEY2,
                { expiresIn: '2d' }
            );
            res.status(200).json({
                msg: "User Login successful",
                AccessToken,
                RefreshToken
            });
        } else {
            res.status(401).json({ msg: "Invalid password" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error occurred during login", error: error.message });
    }
});

module.exports = userRoutes;
