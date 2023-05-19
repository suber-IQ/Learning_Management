import Joi, { ObjectSchema } from 'joi';

const userActivitySchema: ObjectSchema = Joi.object().keys({
  userId: Joi.string(),
  activityType: Joi.string(),
  activityData: Joi.object(),
  timestamp: Joi.date(),
});

export { userActivitySchema };
