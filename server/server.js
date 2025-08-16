import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';

// App Config
const port = process.env.PORT || 8000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Api routes
app.get('/', (req, res) => res.send("Api Working"));
app.use('/api/user', userRouter);

// Start Server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
};

startServer();
