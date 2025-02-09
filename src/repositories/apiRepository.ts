import { Request } from 'express';
import http from 'http';
import https from 'https';

export const forwardRequestToService = async (
  url: string,
  req: Request
): Promise<{ status: number; data: any }> => {
  return new Promise((resolve, reject) => {
    try {
      // Разбираем URL микросервиса
      const parsedUrl = new URL(url);

      // Опции для запроса к микросервису
      const options: http.RequestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port,
        // Объединяем путь и query-параметры
        path: parsedUrl.pathname + parsedUrl.search,
        method: req.method,
        headers: { ...req.headers },
      };

      // Удаляем заголовок host, чтобы избежать конфликтов
      if (options.headers) {
        delete options.headers.host;
      }

      // Выбираем протокол в зависимости от URL
      const protocol = parsedUrl.protocol === 'https:' ? https : http;

      // Создаём запрос к микросервису
      const proxyReq = protocol.request(options, (proxyRes) => {
        let data = '';

        proxyRes.on('data', (chunk) => {
          data += chunk;
        });

        proxyRes.on('end', () => {
          resolve({
            status: proxyRes.statusCode || 500,
            data: data,
          });
        });
      });

      proxyReq.on('error', (err) => {
        reject(err);
      });

      // Если тело запроса существует, отправляем его.
      // Если вы используете express.json(), то req.body уже является объектом,
      // поэтому преобразуем его в JSON-строку.
      if (req.body) {
        let bodyData: string;
        if (typeof req.body === 'object') {
          bodyData = JSON.stringify(req.body);
          // При необходимости обновляем заголовок content-length
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        } else {
          bodyData = req.body;
        }
        proxyReq.write(bodyData);
      }

      proxyReq.end();
    } catch (error) {
      reject(error);
    }
  });
};
