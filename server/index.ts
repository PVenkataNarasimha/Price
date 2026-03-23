import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define Schema
const PriceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  district: { type: String, required: true },
  broiler: { type: [Number], required: true },
  skin: { type: Number, required: true },
  skinless: { type: Number, required: true }
});
const Price = mongoose.model('Price', PriceSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
const User = mongoose.model('User', UserSchema);

// Routes
app.get('/api/prices', async (req, res) => {
  try {
    const prices = await Price.find();
    res.json(prices);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/prices', async (req, res) => {
  try {
    const { date, district, broiler, skin, skinless } = req.body;
    const updatedPrice = await Price.findOneAndUpdate(
      { date },
      { date, district, broiler, skin, skinless },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedPrice);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/prices/:id', async (req, res) => {
  try {
    const { date, district, broiler, skin, skinless } = req.body;
    const updatedPrice = await Price.findByIdAndUpdate(req.params.id, { date, district, broiler, skin, skinless }, { new: true });
    res.json(updatedPrice);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/prices/:id', async (req, res) => {
  try {
    await Price.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});


const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);

// Routes
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, city, phone, comments } = req.body;
    const newFeedback = new Feedback({ name, city, phone, comments });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ id: user._id, username: user.username, role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
