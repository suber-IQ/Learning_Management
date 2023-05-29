import Joi, { ObjectSchema} from 'joi';

const updateCodeSnippetSchema: ObjectSchema = Joi.object().keys({
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
  codeSnippetId: Joi.string().trim().required().messages({
    'any.required': 'Assignment ID is required',
    'string.empty': 'Assignment ID cannot be empty',
  }),
  title: Joi.string().required().min(4).max(100).messages({
    'any.required': 'Title is required',
    'string.empty': 'Title must not be empty',
  }),
  language: Joi.string().max(25).required().messages({
    'any.required': 'Description is required',
    'string.empty': 'Description must not be empty',
  }),
  code: Joi.string().required().messages({
    'any.required': 'Code is required.',
    'string.empty': 'Code must not be empty.',
  }),

});

export { updateCodeSnippetSchema };


