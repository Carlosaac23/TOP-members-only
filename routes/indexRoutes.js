import { Router } from 'express';
import { getHomepage } from '../controllers/indexController.js';

export const indexRoutes = Router();

indexRoutes.get('/', getHomepage);
