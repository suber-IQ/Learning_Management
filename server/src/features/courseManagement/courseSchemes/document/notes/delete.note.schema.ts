import Joi, { ObjectSchema} from 'joi';

const deleteNoteSchema: ObjectSchema = Joi.object().keys({
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
  noteId: Joi.string().trim().required().messages({
    'any.required': 'Note ID is required.',
    'string.empty': 'Note ID must not be empty.',
    'string.base': 'Note ID must be a string.',
  }),
});

export { deleteNoteSchema };


