import Joi, { ObjectSchema} from 'joi';

const getAllCourseSchema: ObjectSchema = Joi.object().keys({
      keyword: Joi.string().trim().allow('').optional().messages({
            'string.base': 'Keyword must be a string.',
            'string.empty': 'Keyword must not be empty.',
          }),
      category: Joi.string().trim().allow('').optional().messages({
            'string.base': 'Category must be a string.',
            'string.empty': 'Category must not be empty.',
      }),
});

export { getAllCourseSchema };


