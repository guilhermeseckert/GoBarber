import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPassworddController from '../controllers/ForgotPaswordController';
import ResetPasswordContrroller from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPassworddController = new ForgotPassworddController();
const resetPasswordContrroller = new ResetPasswordContrroller();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),

  forgotPassworddController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordContrroller.create,
);

export default passwordRouter;
