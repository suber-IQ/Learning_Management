import Joi, { ObjectSchema} from 'joi';

const addLessonSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().trim().required().messages({
    'any.required': 'Lesson ID is required',
    'string.empty': 'Lesson ID cannot be empty',
  }),
  title: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Title must be of type string',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title can not exceed 40 characters',
    'string.empty': 'Lesson title cannot be empty.',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be of type string',
    'string.empty': 'Lesson description cannot be empty.',
  }),
  duration: Joi.number().required().messages({
    'any.required': 'Lesson duration is required.',
    'number.base': 'Lesson duration must be a number.',
  }),
  content: Joi.object({
    public_id: Joi.string().required().messages({
    'string.base': 'Content public ID must be of type string',
      'string.empty': 'Content public ID cannot be empty.',
    }),
    url: Joi.string().required().messages({
    'string.base': 'Content URL must be of type string',
      'string.empty': 'Content URL cannot be empty.',
    }),
  }).required().messages({
    'any.required': 'Content object is required.',
  }),

});

export { addLessonSchema };


