import Joi, { ObjectSchema} from 'joi';

const deleteSlideSchema: ObjectSchema = Joi.object().keys({
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
  slideId: Joi.string().trim().required().messages({
    'any.required': 'Slide ID is required.',
    'string.empty': 'Slide ID must not be empty.',
    'string.base': 'Slide ID must be a string',
  }),
});

export { deleteSlideSchema };


