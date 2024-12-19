require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const examRoutes = require('./routes/examRoutes');  
const eventRoutes = require('./routes/eventRoutes');  

const app = express();
app.use(cors());
app.use(express.json());

// Rotalar
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', examRoutes);  
app.use('/api', eventRoutes);  

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
