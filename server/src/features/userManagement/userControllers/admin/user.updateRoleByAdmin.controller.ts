import {   NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';
import { UserRole } from '@user/userInterface/user.interface';

// Admin user Activity
export class UpdateUserRole  {
  public static update = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const user = await UserModel.findById(req.params.id);

    if(!user){
      return next(new ErrorHandler('User not found!',HTTP_STATUS.NOT_FOUND));

    }

    if (user.role === UserRole.User || user.role === UserRole.Teacher) {
      user.role = UserRole.Admin;
    } else {
      user.role = UserRole.User;
    }

    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User role updated Successfully..',
    });
  });
}
