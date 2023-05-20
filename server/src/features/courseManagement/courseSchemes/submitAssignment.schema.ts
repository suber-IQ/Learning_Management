import Joi, { ObjectSchema} from 'joi';

const submitAssignmentSchema: ObjectSchema = Joi.object().keys({
  courseId: Joi.string().required().messages({
    'any.required': 'Course ID is required.',
    'string.empty': 'Course ID must not be empty.',
  }),
  assignmentId: Joi.string().required().messages({
    'any.required': 'Assignment ID is required.',
    'string.empty': 'Assignment ID must not be empty.',
  }),
  file: Joi.object({
    public_id: Joi.string().required().messages({
      'string.base': 'file public ID must be a string.',
      'any.required': 'file public ID is required.',
    }),
    url: Joi.string().required().messages({
      'string.base': 'file URL must be a string.',
      'any.required': 'file URL is required.',
    }),
  }).required().messages({
    'object.base': 'file must be an object.',
    'any.required': 'file is required.',
  }),

});

export { submitAssignmentSchema };


