import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/Middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

// DTO

const providersRouter = Router();
const providerController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

export default providersRouter;
