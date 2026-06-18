const express = require('express');
const path = require('path');
const cors = require('cors');
const healthRouter = require('./routes/health');
const studentsRouter = require('./routes/students');
const authRouter = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);

// Serve frontend static files (workspace root)
const staticRoot = path.join(__dirname, '..');
app.use(express.static(staticRoot));

// Serve index.html at root
app.get('/', (req, res) => {
	res.sendFile(path.join(staticRoot, 'index.html'));
});

app.use(errorHandler);

module.exports = app;
