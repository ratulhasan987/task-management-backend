const express = require('express');
const connectDB = require('./config/db');
const attachmentRoutes = require('./routes/attachmentRoutes');
const cors = require('cors');

const app = express();
connectDB();

app.use(
  cors({
    origin: 'https://task-management-gamma-swart.vercel.app/',
    // origin: 'http://localhost:3000/',
  })
);
app.use('/api/attachments', attachmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
