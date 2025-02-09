### Тестирование приложения

### 1. Проверка запроса без токена (должен вернуть 401 Unauthorized)
```sh
curl -X GET http://localhost:8080/api/service1/test -i
```
```sh
HTTP/1.1 401 Unauthorized
Content-Type: application/json
{
  "error": "Отсутствует заголовок авторизации"
}
```

### 2. Генерация тестового JWT-токена (если у вас нет готового)
```sh
node -e "console.log(require('jsonwebtoken').sign({ user: 'test' }, 'your_secret_key', { expiresIn: '1h' }))"
```

### 3. Проверка запроса с корректным токеном
```sh
curl -X GET http://localhost:8080/api/service1/test \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -i
```

### 4. Тест POST-запроса с телом
```sh
curl -X POST http://localhost:8080/api/service1/data \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, microservice!"}' \
     -i
```

### 5. Проверка запроса к защищённому маршруту с неверным токеном
```sh
curl -X GET http://localhost:8080/api/service1/test \
     -H "Authorization: Bearer INVALID_TOKEN" \
     -i
```
```
HTTP/1.1 401 Unauthorized
Content-Type: application/json
{
  "error": "Неверный токен"
}
```

### 6. Проверка работы с разными методами
```sh
curl -X PUT http://localhost:8080/api/service1/resource/123 \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"updated": true}' \
     -i
```

### 7. Проверка, как API Gateway передаёт заголовки
```sh
curl -X GET http://localhost:8080/api/service1/test \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Custom-Header: TestValue" \
     -v
```