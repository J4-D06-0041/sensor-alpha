const express = require("express");
const db = require("../../config/db"); // Ensure db is configured properly

const companyRouter = express.Router();

// Route to get all companies
companyRouter.get("/", (req, res) => {
    const sql = "SELECT * FROM company"; // Adjust table name if needed

    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = companyRouter;