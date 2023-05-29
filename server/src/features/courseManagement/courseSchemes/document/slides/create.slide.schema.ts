import Joi, { ObjectSchema} from 'joi';

const createSlideSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().trim().required().messages({
    'any.required': 'Course ID is required.',
    'string.empty': 'Course ID must not be empty.',
    'string.base': 'Course ID must be a string',
  }),
  lessonId: Joi.string().trim().required().messages({
    'any.required': 'Lesson ID is required.',
    'string.empty': 'Lesson ID must not be empty.',
    'string.base': 'Lesson ID must be a string',
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.base': 'Title must be a string',
  }),
  file: Joi.object({
    public_id: Joi.string().required().messages({
      'any.required': 'Public ID is required',
      'string.base': 'Public ID must be a string',
    }),
    url: Joi.string().required().messages({
      'any.required': 'URL is required',
      'string.base': 'URL must be a string',
    }),
  }).required().messages({
    'any.required': 'File is required',
  }),

});

export { createSlideSchema };


