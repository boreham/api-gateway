import { Request } from 'express';

export const validateRequest = (req: Request): void => {
  // Здесь можно добавить кастомную логику валидации
  // Например, проверку наличия необходимых заголовков или параметров
  // Если валидация не пройдена, можно выбросить исключение:
  // if (!req.headers['x-api-key']) {
  //   throw new Error('Отсутствует x-api-key');
  // }
};
