import { Request, Response } from 'express';
import * as apiService from '../services/apiService';

export const handleService1 = async (req: Request, res: Response) => {
  try {
    // Убираем префикс "/api/service1" для формирования пути на микросервисе
    const servicePath = req.originalUrl.replace('/api/service1', '');
    const response = await apiService.forwardRequest('MICROSERVICE1_URL', servicePath, req);
    res.status(response.status).send(response.data);
  } catch (error: any) {
    console.error('Ошибка в handleService1:', error.message);
    res.status(500).send({ error: 'Внутренняя ошибка сервера' });
  }
};

export const handleService2 = async (req: Request, res: Response) => {
  try {
    const servicePath = req.originalUrl.replace('/api/service2', '');
    const response = await apiService.forwardRequest('MICROSERVICE2_URL', servicePath, req);
    res.status(response.status).send(response.data);
  } catch (error: any) {
    console.error('Ошибка в handleService2:', error.message);
    res.status(500).send({ error: 'Внутренняя ошибка сервера' });
  }
};

export const handleService3 = async (req: Request, res: Response) => {
  try {
    const servicePath = req.originalUrl.replace('/api/service3', '');
    const response = await apiService.forwardRequest('MICROSERVICE3_URL', servicePath, req);
    res.status(response.status).send(response.data);
  } catch (error: any) {
    console.error('Ошибка в handleService3:', error.message);
    res.status(500).send({ error: 'Внутренняя ошибка сервера' });
  }
};
