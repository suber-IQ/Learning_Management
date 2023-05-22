import Joi, { ObjectSchema} from 'joi';

const deleteNoteSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().trim().required().messages({
    'any.required': 'Course ID is required.',
    'string.empty': 'Course ID must not be empty.',
  }),
  lessonId: Joi.string().trim().required().messages({
    'any.required': 'Lesson ID is required.',
    'string.empty': 'Lesson ID must not be empty.',
  }),
  noteId: Joi.string().trim().required().messages({
    'any.required': 'Lesson ID is required.',
    'string.empty': 'Lesson ID must not be empty.',
  }),
});

export { deleteNoteSchema };


