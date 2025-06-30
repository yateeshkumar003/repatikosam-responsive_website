const express = require('express');
const mongoose = require('mongoose');
const Submission = require('./models/Submission');
const app = express();

app.use(express.json());
app.use(express.static('../client')); // serve frontend

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/livecode', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(console.error);

// Save submission
app.post('/submit', async (req, res) => {
  const sub = new Submission(req.body);
  await sub.save();
  res.sendStatus(201);
});

// Get leaderboard
app.get('/leaderboard', async (req, res) => {
  const subs = await Submission
    .find().sort({ createdAt: -1 }).limit(50);
  res.json(subs.map(s => ({
    language: s.language, time: s.time, result: s.result
  })));
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
