import {   NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';

// Admin user Activity
export class GetUserActivity  {
  public static read = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;

      // Find user Activites by user Id
      const userActivities = await UserModel.findOne({
         activities: [
          userId
         ]
      });

      console.log(userActivities);
      if(!userActivities){
        return next(new ErrorHandler('Not Found Activity userId',HTTP_STATUS.NOT_FOUND));
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        userActivities
      });
  });
}
