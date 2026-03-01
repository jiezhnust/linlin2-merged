import express from 'express';
import { container } from '../../infrastructure/config/container';

const router = express.Router();

// Auth routes
router.post('/auth/login-with-phone', container.getAuthController().loginWithPhone.bind(container.getAuthController()));

// Item routes
router.get('/items', container.getItemController().getAllItems.bind(container.getItemController()));

// Want routes
router.post('/wants', container.getWantController().createWant.bind(container.getWantController()));

export default router;