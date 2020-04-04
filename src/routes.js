import { Router } from 'express';

import DeveloperController from './controllers/DeveloperController';

const route = Router();

route.use('/developers', DeveloperController.run());

export default route;
