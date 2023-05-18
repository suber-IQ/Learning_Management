import Joi, { ObjectSchema,ref } from 'joi';

const resetPasswordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,10}$')).required().min(4).max(10).messages({
    'string.pattern.base': 'Password must be between 4 and 10 characters and contain only alphanumeric characters',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  confirmPassword: Joi.string().required().valid(ref('password')).messages({
    'any.only': 'Password do not match'
  }),
});

export { resetPasswordSchema };
