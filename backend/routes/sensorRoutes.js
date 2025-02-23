const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/insert", (req, res) => {
    const { temperature, humidity, gas } = req.body;
    const sql = "INSERT INTO sensor_data (temperature, humidity, gas) VALUES (?, ?, ?)";
    db.query(sql, [temperature, humidity, gas], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.send({ message: "Sensor data inserted successfully", id: result.insertId });
    });
});

router.get("/data", (req, res) => {
    const sql = "SELECT * FROM sensor_data ORDER BY recorded_at DESC";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

router.post("/request-sensor-data", (req, res) => {
    const { sensor_id } = req.body;
    const sql = `
        INSERT INTO requests (sensor_id, reading_request)
        VALUES (?, 1)
        ON DUPLICATE KEY UPDATE reading_request = 1, updated_at = CURRENT_TIMESTAMP;
    `;
    db.query(sql, [sensor_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Sensor data request recorded successfully" });
    });
});

router.post("/update-sensor-status", (req, res) => {
    const { sensorID, status } = req.body;
    const sql = `
        INSERT INTO sensor_status (sensorID, status)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status), updated_at = CURRENT_TIMESTAMP;
    `;
    db.query(sql, [sensorID, status], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Sensor status updated successfully" });
    });
});

router.get("/sensor-status", (req, res) => {
    const { sensorID } = req.query;
    let sql = `
        SELECT *, 
        CASE 
            WHEN TIMESTAMPDIFF(SECOND, updated_at, NOW()) > 10 THEN false 
            ELSE true 
        END AS isValid
        FROM sensor_status
    `;
    let params = [];

    if (sensorID) {
        sql += " WHERE sensorID = ? ORDER BY updated_at DESC LIMIT 1";
        params.push(sensorID);
    } else {
        sql += " ORDER BY updated_at DESC";
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results.length > 0 ? results[0] : { message: "No sensor data found", isValid: false });
    });
});

module.exports = router;