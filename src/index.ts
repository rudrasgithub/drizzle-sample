import express from 'express';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';
import loginRouter from './routes/loginRouter';

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api', loginRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});