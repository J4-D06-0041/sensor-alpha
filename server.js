const express = require('express');
const db = require('./db');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/insert', (req, res) => {
    const { temperature, humidity, gas } = req.body;
    const sql = 'INSERT INTO sensor_data (temperature, humidity, gas) VALUES (?, ?, ?)';
    db.query(sql, [temperature, humidity, gas], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
        res.send({ message: 'Sensor data inserted successfully', id: result.insertId });
    });
});

app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM sensor_data ORDER BY recorded_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.post('/api/request-sensor-data', (req, res) => {
    const { sensor_id } = req.body;
    const sql = `
        INSERT INTO requests (sensor_id, reading_request)
        VALUES (?, 1)
        ON DUPLICATE KEY UPDATE reading_request = 1, updated_at = CURRENT_TIMESTAMP;
    `;
    db.query(sql, [sensor_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Sensor data request recorded successfully' });
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});