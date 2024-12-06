const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const certificateRoutes = require('./routes/certificates');

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));


app.use(express.json());
app.use('/api/certificates', certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
