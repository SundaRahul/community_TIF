import app from './src/index.js';
import dotenv from 'dotenv';
import connectDB from './src/config/database.js';

dotenv.config();

const PORT =3000;

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


