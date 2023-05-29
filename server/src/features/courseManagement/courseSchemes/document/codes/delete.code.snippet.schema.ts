import Joi, { ObjectSchema} from 'joi';

const deleteCodeSnippetSchema: ObjectSchema = Joi.object().keys({
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
    'any.required': 'CodeSnippet ID is required.',
    'string.empty': 'CodeSnippet ID must not be empty.',
    'string.base': 'CodeSnippet ID must be a string.',
  }),
});

export { deleteCodeSnippetSchema };


