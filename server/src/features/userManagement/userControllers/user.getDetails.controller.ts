import {   Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { AuthRequest, IUser } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';


export class GetUserDetails {
  public static read = catchAsyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
      const user: IUser | null = await UserModel.findById(req.user?.id);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        user
      });
  });
}
