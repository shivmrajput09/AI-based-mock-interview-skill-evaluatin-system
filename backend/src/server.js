const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const aiRoutes = require('./routes/aiRoutes');
const jobRoutes = require('./routes/jobRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL || '*'],
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
let server;
try {
  server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (err) {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} in use, trying port ${PORT + 1}...`);
    server = app.listen(PORT + 1, () => {
      console.log(`Server started on fallback port ${PORT + 1}`);
    });
  } else {
    throw err;
  }
}

server.on('error', (err) => {
  console.error('Server error', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop other process or change PORT in .env.`);
    process.exit(1);
  }
});
