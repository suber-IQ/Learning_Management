import Joi, { ObjectSchema} from 'joi';

const updateQuizSchema: ObjectSchema = Joi.object().keys({
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
    'string.empty': 'Title is required.',
  }),
  question: Joi.string().required().messages({
    'string.empty': 'Question is required.',
  }),
  optionA: Joi.string().required().messages({
    'string.empty': 'Option A is required.',
  }),
  optionB: Joi.string().required().messages({
    'string.empty': 'Option B is required.',
  }),
  optionC: Joi.string().required().messages({
    'string.empty': 'Option C is required.',
  }),
  optionD: Joi.string().required().messages({
    'string.empty': 'Option D is required.',
  }),
  explanation: Joi.string().required().messages({
    'string.empty': 'Explanation is required.',
  }),
  answer: Joi.string()
    .valid('optionA', 'optionB', 'optionC', 'optionD')
    .required()
    .messages({
      'string.empty': 'Answer is required.',
      'any.only': 'Answer must be one of the provided options (optionA, optionB, optionC, optionD).',
    }),
});

export { updateQuizSchema };


