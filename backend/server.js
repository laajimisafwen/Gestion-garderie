const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./db/db");
const authRoutes = require('./routes/authRoutes');
const routes = require('./routes/routes');

db();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(cors());

// Routes
app.use('/api/user', authRoutes);
app.use('/api/user', routes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//projet ons