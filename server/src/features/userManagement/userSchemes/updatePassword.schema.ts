import Joi, { ObjectSchema } from 'joi';

const updatePasswordSchema: ObjectSchema = Joi.object().keys({
  oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,10}$')).required().min(4).max(10).messages({
    'string.pattern.base': 'old Password must be between 4 and 10 characters and contain only alphanumeric characters',
    'string.min': 'Invalid old Password',
    'string.max': 'Invalid old Password',
    'string.empty': 'old Password is a required field'
  }),
newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,10}$')).required().min(4).max(10).messages({
  'string.pattern.base': 'new Password must be between 4 and 10 characters and contain only alphanumeric characters',
  'string.min': 'Invalid new Password',
  'string.max': 'Invalid new Password',
  'string.empty': 'new Password is a required field'
}),
confirmPassword: Joi.string()
  .valid(Joi.ref('newPassword'))
  .required()
  .messages({
    'string.base': 'Confirm password must be of type string',
    'string.empty': 'Confirm password is a required field',
    'any.only': 'Confirm password does not match the new password',
  }),
});

export { updatePasswordSchema };
