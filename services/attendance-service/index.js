const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Mock database for the demo
let attendanceLogs = [];

// POST /attendance/clock-in
app.post('/clock-in', (req, res) => {
    const { employee_id } = req.body;
    if (!employee_id) return res.status(400).json({ message: "Employee ID required" });

    const log = {
        id: attendanceLogs.length + 1,
        employee_id,
        time: new Date().toISOString(),
        status: 'Present'
    };
    attendanceLogs.push(log);
    res.status(201).json(log);
});

// GET /attendance/history
app.get('/history', (req, res) => {
    res.json(attendanceLogs);
});

app.listen(5000, () => console.log('Attendance Service running on port 5000'));