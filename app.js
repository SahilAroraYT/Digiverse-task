const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv')
const path = require('path');

dotenv.config()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

async function connectDB(){
    await mongoose.connect(process.env.MONGO_DB_DATABASE_STRING);
    console.log("Connected to MongoDB");
    
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  const savedUser = await user.save();
  res.json(savedUser);
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { name, email, age } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, age },
    { new: true }
  );
  res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
  connectDB()
});