import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';
import { authorize } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Все маршруты, начинающиеся с /api, теперь проходят проверку авторизации
app.use('/api', authorize, apiRoutes);

// без авторизации
// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`API Gateway запущен на порту ${PORT}`);
});
