const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");  
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

//Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO userdata (name, email, password) VALUES ($1, $2, $3) RETURNING *";
        const result = await db.query(query, [name, email, hashedPassword]);  

        res.status(201).json({ message: "User registered successfully!", user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user", error });
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const query = "SELECT * FROM userdata WHERE email = $1";
        const result = await db.query(query, [email]);  
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login", error });
    }
});

module.exports = router;
