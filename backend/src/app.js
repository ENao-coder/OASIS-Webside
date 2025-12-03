import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        ok: true, 
        message: 'Server is running',
        firebase: {
            projectId: process.env.FIREBASE_PROJECT_ID,
            configured: !!process.env.FIREBASE_PRIVATE_KEY
        }
    });
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});