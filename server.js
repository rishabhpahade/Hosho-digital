const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Import routes
app.use('/auth', require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));
app.use('/activities', require('./routes/activities'));
app.use('/opportunities', require('./routes/opportunities'));
app.use('/performance', require('./routes/performance'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
