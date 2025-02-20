// Import required packages
const express = require('express'); // Express framework for Node.js
const dotenv = require('dotenv'); // Load environment variables
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bodyParser = require('body-parser'); // Parse incoming request bodies
const cors = require('cors'); // Cross-Origin Resource Sharing middleware

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const authRoutes = require('./routes/authRoutes');
const queueRoutes = require('./routes/queueRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/queue', queueRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
