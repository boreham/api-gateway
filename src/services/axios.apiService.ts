import { Request } from 'express';
import axios, { AxiosResponse } from 'axios';
import { forwardRequestToService } from '../repositories/apiRepository';
import { validateRequest } from '../utils/validation';

export const forwardRequest = async (
  serviceEnvVar: string,
  servicePath: string,
  req: Request
): Promise<AxiosResponse> => {
  // Выполнить дополнительную валидацию запроса (например, проверку API-ключа)
  validateRequest(req);

  const serviceUrl = process.env[serviceEnvVar];
  if (!serviceUrl) {
    throw new Error(`URL сервиса для ${serviceEnvVar} не определён`);
  }
  
  // Формируем полный URL для запроса к микросервису
  const url = `${serviceUrl}${servicePath}`;

  // Пересылаем запрос с помощью функции-репозитория
  const response = await forwardRequestToService(url, req);
  return response;
};
