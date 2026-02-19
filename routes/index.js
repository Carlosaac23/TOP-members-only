import { Router } from 'express';
import { getHome } from '../controllers/indexController';

export const indexRouter = Router();

indexRouter.get('/', getHome);
