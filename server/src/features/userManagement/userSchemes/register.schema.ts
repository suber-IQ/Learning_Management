import Joi, { ObjectSchema,ref } from 'joi';

const registerSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Invalid username',
    'string.max': 'Invalid username',
    'string.empty': 'Username is a required field'
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,10}$')).required().min(4).max(10).messages({
    'string.pattern.base': 'Password must be between 4 and 10 characters and contain only alphanumeric characters',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  confirmPassword: Joi.string().required().valid(ref('password')).messages({
    'any.only': 'Password do not match'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field'
  }),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  avatar: Joi.string().optional(),
});

export { registerSchema };
