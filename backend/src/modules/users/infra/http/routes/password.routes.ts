import { Router } from 'express';
import ForgotPassworddController from '../controllers/ForgotPaswordController';
import ResetPasswordContrroller from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPassworddController = new ForgotPassworddController();
const resetPasswordContrroller = new ResetPasswordContrroller();

passwordRouter.post('/forgot', forgotPassworddController.create);
passwordRouter.post('/reset', resetPasswordContrroller.create);

export default passwordRouter;
