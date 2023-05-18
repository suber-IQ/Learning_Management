import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
  usernameOrEmail: Joi.string().required().messages({
    'string.base': 'Username or email must be of type string',
    'string.empty': 'Username or email is a required field',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be of type string',
    'string.empty': 'Password is a required field',
  }),
});

export { loginSchema };
