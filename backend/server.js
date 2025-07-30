require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.js');
const issueRoutes = require('./routes/issues.js');
const commentRoutes = require('./routes/comments.js');
const errorHandler = require('./middleware/errorHandler.js');
const attachmentRoutes = require('./routes/attachments.js');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/issues', commentRoutes);
// Add near other middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add with other routes
app.use('/api/issues', attachmentRoutes);

// Test route
app.get('/', (req, res) => res.send('Issue Tracker API'));

// Error handling (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));