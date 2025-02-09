### Приложение API Gateway Express, TypeScript, Dotenv. Приложение перенаправлят по маршруту к микросервисам.
```
gateway ──├── app:1000
          ├── app:2000
          └── app:3000
```
Структура проекта:
```
api-gateway/
├── src/
│   ├── controllers/
│   │   └── apiController.ts        
│   ├── repositories/
│   │   └── apiRepository.ts
│   ├── routes/
│   │   └── apiRoutes.ts
│   ├── services/
│   │   └── apiService.ts
│   ├── utils/
│   │   └── validation.ts
│   └── app.ts
├── .env
├── package.json
└── tsconfig.json
```