import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorize = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Отсутствует заголовок авторизации' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Отсутствует токен' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    (req as any).user = decoded; // Сохраняем расшифрованные данные токена в req.user
    next(); // Передаём управление следующему middleware
  } catch (error) {
    res.status(401).json({ error: 'Неверный токен' });
    return;
  }
};
