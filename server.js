const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json()); // To parse JSON bodies

// ---------------- Routes ---------------- //

// 1️⃣ User Login
app.post('/userlogin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const response = await fetch('http://10.0.2.2:8060/trial_1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching user login:', error);
    res.status(500).json({ error: 'Failed to fetch user login data' });
  }
});

// 2️⃣ Appointments
app.post('/appointments', async (req, res) => {
  const { doctors_id, office_id } = req.body;

  if (!doctors_id || !office_id) {
    return res.status(400).json({ error: "doctors_id and office_id required" });
  }

  try {
    const response = await fetch('http://10.0.2.2:8060/trial_1/appoinements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctors_id, office_id })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// 3️⃣ Patient History
app.post('/patienthistory', async (req, res) => {
  const { op_number, consult_id } = req.body;

  if (!op_number || !consult_id) {
    return res.status(400).json({ error: "op_number and consult_id required" });
  }

  try {
    const response = await fetch('http://10.0.2.2:8060/trial_1/patienthistory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ op_number, consult_id })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching patient history:', error);
    res.status(500).json({ error: 'Failed to fetch patient history' });
  }
});

// ---------------- Start Server ---------------- //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy API running on port ${PORT}`);
});
