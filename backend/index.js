
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

console.log("PORT from env:", process.env.PORT); 
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://20ra5a0505:20ra5a0505@cluster0.qymybki.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});


const Transaction = mongoose.model('Transaction', {
  amount: Number,
  date: Date,
  description: String,
});

app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
});

app.post('/transactions', async (req, res) => {
  const { amount, date, description } = req.body;
  const newTx = new Transaction({ amount, date, description });
  await newTx.save();
  res.json(newTx);
});

app.delete('/transactions/:id', async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
