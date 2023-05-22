import Joi, { ObjectSchema} from 'joi';

const deleteAssignmentSchema: ObjectSchema = Joi.object().keys({
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
  assignmentId: Joi.string().trim().required().messages({
    'string.base': 'Assignment ID must be string',
    'any.required': 'Assignment ID is required.',
    'string.empty': 'Assignment ID cannot be empty.',
  }),
});

export { deleteAssignmentSchema };


