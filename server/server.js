import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';

const PORT = process.env.PORT || 4000;
const app = express();
await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/user', userRouter);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });

export default app;
