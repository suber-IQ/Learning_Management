import {   Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import UserModel from '@user/userModel/user.model';
import { userActivitySchema } from '@user/userSchemes/activityUser.schema';
import { joiValidation } from '@global/decorators/joi-validation.decorators';

// Admin user Activity
export class ActivityUser  {
  @joiValidation(userActivitySchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response): Promise<void> => {
      //  Log user activity
      const { userId, activityType, activityData } = req.body;

      const userActivity = new UserModel({
        activities: [
          {
            userId,
            activityType,
            activityData,
            timestamp: new Date()
          }
        ]
      });

      await userActivity.save();

      res.status(HTTP_STATUS.CREATED).json({
        success: true
      });

  });
}
