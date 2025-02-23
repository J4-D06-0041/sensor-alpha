const express = require("express");
const db = require("../../config/db");
const bcrypt = require("bcrypt");

const authenticationRouter = express.Router();

authenticationRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send({ message: "Invalid credentials" });

        const user = results[0];

        if (password === user.password) {
            res.send({ message: "Login successful", name: user.name });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    });
});

module.exports = authenticationRouter;