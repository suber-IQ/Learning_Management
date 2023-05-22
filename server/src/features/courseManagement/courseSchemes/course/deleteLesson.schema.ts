import Joi, { ObjectSchema} from 'joi';

const deleteLessonSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().trim().required().messages({
    'string.base': 'Course ID must be string',
    'any.required': 'Course ID is required.',
    'string.empty': 'Course ID cannot be empty.',
  }),
  lessonId: Joi.string().trim().required().messages({
    'string.base': 'Lecture ID must be string',
    'any.required': 'Lecture ID is required.',
    'string.empty': 'Lecture ID cannot be empty.',
  }),
});

export { deleteLessonSchema };


