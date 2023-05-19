import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import UserModel from '@user/userModel/user.model';

// Admin user Activity
export class GetAllUser  {
  public static read = catchAsyncHandler(async (req: Request, res: Response): Promise<void> => {
      const users = await UserModel.find({});

      res.status(HTTP_STATUS.OK).json({
        success: true,
        users
      });
  });
}
