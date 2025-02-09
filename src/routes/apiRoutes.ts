import { Router } from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

// Для всех HTTP-методов (GET, POST, PUT, DELETE, …)
// маршруты с префиксом service1, service2 и service3 обрабатываются соответствующими контроллерами
router.all('/service1/*', apiController.handleService1);
router.all('/service2/*', apiController.handleService2);
router.all('/service3/*', apiController.handleService3);

export default router;
