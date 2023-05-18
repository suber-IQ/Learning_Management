import Joi, { ObjectSchema } from 'joi';

const forgotPasswordSchema: ObjectSchema = Joi.object().keys({
  usernameOrEmail: Joi.string().required().messages({
    'string.base': 'Username or email must be of type string',
    'string.empty': 'Username or email is a required field',
  }),
});

export { forgotPasswordSchema };
