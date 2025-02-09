import axios, { AxiosResponse } from 'axios';
import { Request } from 'express';

export const forwardRequestToService = async (
  url: string,
  req: Request
): Promise<AxiosResponse> => {
  try {
    const method = req.method.toLowerCase();
    // Копируем заголовки, удаляя заголовок host, чтобы не возникло конфликтов
    const headers = { ...req.headers };
    delete headers.host;

    const axiosConfig = {
      method: method as any,
      url,
      headers,
      params: req.query,
      data: req.body
    };

    const response = await axios(axiosConfig);
    return response;
  } catch (error: any) {
    // Прокидываем ошибку выше для обработки контроллером
    throw error;
  }
};
