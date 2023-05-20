import { UserRole } from '@user/userInterface/user.interface';
import Joi, { ObjectSchema} from 'joi';

const updateProfileSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Invalid username',
    'string.max': 'Invalid username',
    'string.empty': 'Username is a required field'
  }),
  email: Joi.string().required().email().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Email must be valid',
    'string.empty': 'Email is a required field'
  }),
  firstName: Joi.string().messages({
    'string.base': 'First name must be of type string',
    'string.empty': 'First name is a required field',
  }),
  lastName: Joi.string().messages({
    'string.base': 'Last name must be of type string',
    'string.empty': 'Last name is a required field',
  }),
  avatar: Joi.string().allow('').optional(),
  age: Joi.number().integer().min(0).max(2).messages({
    'number.base': 'Age must be of type number',
    'number.empty': 'Age is a required field',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be a positive number',
  }),
  role: Joi.string().required().valid(UserRole.Teacher,UserRole.User).messages({
    'any.required': 'Role is required.',
    'string.empty': 'Role cannot be empty.',
    'any.only': 'Role must be either "teacher" or "user".'
  })

});

export { updateProfileSchema };


