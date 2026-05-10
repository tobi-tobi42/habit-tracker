const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', message: 'Welcome to CreatorQuest AI API!' });
});

// Database connection placeholder
// mongoose.connect('mongodb://localhost:27017/creatorquest')
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
