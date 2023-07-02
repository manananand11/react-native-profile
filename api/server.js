// server.js
const dotenv = require("dotenv");
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/authenticateToken');
const dashboardRoutes = require('./routes/dashboardRoutes');
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;
dotenv.config();
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
