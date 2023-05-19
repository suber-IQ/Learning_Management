import { CourseLevel } from '@course/courseInterface/courseInterface';
import Joi, { ObjectSchema} from 'joi';

const createCourseSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().min(4).max(80).messages({
    'string.base': 'Title must be of type string',
    'string.min': 'Title must be at least 4 characters',
    'string.max': 'Title can not exceed 80 characters',
    'string.empty': 'Title is a required field'
  }),
  description: Joi.string().required().min(20).messages({
    'string.base': 'Description must be of type string',
    'string.min': 'Description must be at least 20 characters',
    'string.empty': 'Description is a required field'
  }),
  level: Joi.string().valid(...Object.values(CourseLevel)).required().messages({
    'any.only': 'Invalid course level.',
    'any.required': 'Level is required.',
  }),
  price: Joi.number().max(6).required().messages({
    'number.base': 'Price must be a number.',
    'any.required': 'Price is required.',
    'number.max': 'Price not more than 6 digits'
  }),
  coupon: Joi.object({
    code: Joi.string().allow('').optional().trim().messages({
      'string.base': 'Coupon code must be a string.',
      'string.empty': 'Coupon code cannot be empty.',
    }),
    discount: Joi.number().min(0).max(Joi.ref('price')).messages({
      'number.base': 'Coupon discount must be a number.',
      'number.min': 'Coupon discount cannot be negative.',
      'number.max': 'Coupon discount cannot exceed 100.',
    }),
  }).optional().messages({
    'object.base': 'Coupon must be an object.',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string.',
    'any.required': 'Category is required.',
  }),
  poster: Joi.object({
    public_id: Joi.string().required().messages({
      'string.base': 'Poster public ID must be a string.',
      'any.required': 'Poster public ID is required.',
    }),
    url: Joi.string().required().messages({
      'string.base': 'Poster URL must be a string.',
      'any.required': 'Poster URL is required.',
    }),
  }).required().messages({
    'object.base': 'Poster must be an object.',
    'any.required': 'Poster is required.',
  }),
  createdBy: Joi.string().required().messages({
    'string.base': 'Created by must be a string.',
    'any.required': 'Created by is required.',
  }),
});

export { createCourseSchema };


