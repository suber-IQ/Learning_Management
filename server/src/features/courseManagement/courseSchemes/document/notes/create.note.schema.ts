import Joi, { ObjectSchema} from 'joi';

const createNoteSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().trim().required().messages({
    'any.required': 'Course ID is required.',
    'string.empty': 'Course ID must not be empty.',
  }),
  lessonId: Joi.string().trim().required().messages({
    'any.required': 'Lesson ID is required.',
    'string.empty': 'Lesson ID must not be empty.',
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required.',
    'string.empty': 'Title must not be empty.',
  }),
  content: Joi.string().required().messages({
    'any.required': 'Content is required.',
    'string.empty': 'Content must not be empty.',
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Tags are required.',
    'array.base': 'Tags must be an array.',
    'array.empty': 'Tags must not be empty.',
    'string.empty': 'Tag must not be empty.',
  }),
  attachments: Joi.array().items(Joi.object({
    file_public_id: Joi.string().required().messages({
      'string.base': 'Attachment file_public_id must be a string',
      'any.required': 'Attachment file_public_id is required',
    }),
    file_url: Joi.string().required().messages({
      'string.base': 'Attachment file_url must be a string',
      'any.required': 'Attachment file_url is required',
    }),
  })).messages({
    'array.base': 'Attachments must be an array of objects',
  }),
});

export { createNoteSchema };


