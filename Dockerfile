# Используем официальный Node.js образ
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Строим TypeScript проект
RUN npm run build

# Открываем порт для Express
EXPOSE 8080

# Запускаем сервер
CMD ["npm", "run", "start"]
