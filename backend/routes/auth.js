


const express = require('express');
const router = express.Router();
const db = require('../database/db.js'); // Adjust path as necessary
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




router.post('/adminlogin', (req, res) => {
    const sql = 'SELECT * FROM admin WHERE email=?';
    
    db.query(sql, [req.body.email], (err, result) => {
        if (err) return res.status(500).json({ loginStatus: false, Error: "Query error" });

        if (result.length > 0) {
            const user = result[0];

            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) return res.status(500).json({ loginStatus: false, Error: "Password comparison error" });

                if (match) {
                    const token = jwt.sign({ role: "admin", email: user.email }, "mayurirajput236", { expiresIn: "5d" });
                    res.cookie("token", token);
                    return res.json({ loginStatus: true, token });
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong email or password" });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

module.exports = router;

