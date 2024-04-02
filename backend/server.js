// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/authRoutes');

const router2 = require('./routes/usersRoutes');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api', router);
app.use('/api/users', router2);

app.use('/api/user', require('./routes/users'));


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
