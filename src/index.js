import express from 'express';
import authRoutes from './routes/authRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import memberRoutes from './routes/memberRoutes.js'
import roleRoutes from './routes/roleRoutes.js'

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/community', communityRoutes);
app.use('/v1',memberRoutes);
app.use('/v1/role',roleRoutes);

export default app; 
