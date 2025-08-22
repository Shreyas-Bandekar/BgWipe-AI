import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';

const PORT = process.env.PORT || 4000;
const app = express();

try {
  await connectDB();
  console.log('Database connected successfully');
} catch (error) {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
}

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/user', userRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });

export default app;
