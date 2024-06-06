const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dataRoutes = require('./Routes/Dashboard');
const cors = require ('cors');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));



// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/data', dataRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Start the server after successful database connection
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
});

// Routes
app.get('/', (req, res) => {
  res.send('It works');
});

module.exports = app;
