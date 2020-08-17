import { celebrate, Joi, Segments } from 'celebrate';

const createUserValidation = celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(3).required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'), {
        name:
          '"at least a number, a lowercase letter, a uppercase letter, and minimum of 6 characters"',
      })
      .required(),
    password_confirmation: Joi.required().valid(Joi.ref('password')),
  },
});

const sessionValidation = celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  },
});

export { createUserValidation, sessionValidation };
