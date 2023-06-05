import Joi, { ObjectSchema} from 'joi';

const getAllLessonSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().trim().required().messages({
    'string.base': 'Course ID must be string',
    'any.required': 'Course ID is required.',
    'string.empty': 'Course ID cannot be empty.',
  }),
});

export { getAllLessonSchema };


