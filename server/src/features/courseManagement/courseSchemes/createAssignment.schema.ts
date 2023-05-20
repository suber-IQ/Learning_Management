import Joi, { ObjectSchema} from 'joi';

const createAssignmentSchema: ObjectSchema = Joi.object().keys({
  title: Joi.string().required().messages({
    'string.base': 'Title must be String',
    'string.empty': 'Please enter the assignment title',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be String',
    'string.empty': 'Please enter the assignment description',
  }),
  deadline: Joi.date().required().messages({
    'date.base': 'Please enter a valid deadline date',
  }),
  courseId: Joi.string().required().messages({
    'strin.base': 'Course ID must be String',
    'string.empty': 'Please enter the course ID',
  }),

});

export { createAssignmentSchema };


