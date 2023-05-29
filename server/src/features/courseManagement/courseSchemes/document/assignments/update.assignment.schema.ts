import Joi, { ObjectSchema} from 'joi';

const updateAssignmentSchema: ObjectSchema = Joi.object().keys({
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
  assignmentId: Joi.string().trim().required().messages({
    'string.base': 'Assignment ID must be string',
    'any.required': 'Assignment ID is required.',
    'string.empty': 'Assignment ID cannot be empty.',
  }),
  title: Joi.string().trim().required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be empty',
  }),
  description: Joi.string().trim().required().messages({
    'any.required': 'Description is required',
    'string.empty': 'Description cannot be empty',
  }),
  deadline: Joi.date().iso().required().messages({
    'any.required': 'Deadline is required',
    'date.base': 'Deadline must be a valid date',
    'date.format': 'Deadline must be in ISO 8601 format',
  }),

});

export { updateAssignmentSchema };


