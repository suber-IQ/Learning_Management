import Joi, { ObjectSchema} from 'joi';

const createAssignmentSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().min(4).messages({
    'any.required': 'Title is required',
    'string.empty': 'Title must not be empty',
  }),
  description: Joi.string().min(6).required().messages({
    'any.required': 'Description is required',
    'string.empty': 'Description must not be empty',
  }),
  deadline: Joi.date().required().messages({
    'any.required': 'Deadline is required',
    'date.base': 'Deadline must be a valid date',
    'date.format': 'Deadline must be in ISO 8601 format',
  }),
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

});

export { createAssignmentSchema };


