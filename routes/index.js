import { Router } from 'express';
import { getHome } from '../controllers/indexController.js';

export const indexRouter = Router();

indexRouter.get('/', getHome);
