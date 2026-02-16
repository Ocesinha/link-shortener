import { Router } from 'express';
import logoutController from '../controllers/logout.js';
import shortenController from '../controllers/shorten.js';
import deleteLink from '../controllers/deleteLink.js';

const router = Router();

router.get('/logout', logoutController);
router.post('/shorten', shortenController);
router.post('/delete/:id', deleteLink);

export default router;
