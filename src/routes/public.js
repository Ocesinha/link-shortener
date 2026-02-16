import { Router } from 'express';
import homeController from '../controllers/home.js';
import { loginController, login } from '../controllers/login.js';
import { renderRegister, register } from '../controllers/register.js';
import linkController from '../controllers/link.js';

const router = Router();

router.get('/', homeController);
router.get('/login', loginController);
router.get('/register', renderRegister);
router.get('/link/:shortenurl', linkController);

router.post('/login', login);
router.post('/register', register);

export default router;
