import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/Middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

// DTO

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
