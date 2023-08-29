const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const dbUrl = process.env.DB_URL;

const app = express();
app.use(express.json());

// Use cors middleware before defining routes
app.use(cors());

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
