const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Meme = require('./Meme');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from AI Meme Generator backend!');
});

// Endpoint to save meme data
app.post('/api/memes', async (req, res) => {
  const { image, caption } = req.body;

  try {
    const meme = new Meme({ image, caption });
    await meme.save();
    res.json({ message: 'Meme saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving meme' });
  }
});

// Endpoint to get memes (limit 1000, newest first)
app.get('/api/memes', async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 }).limit(1000);
    res.json(memes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching memes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

