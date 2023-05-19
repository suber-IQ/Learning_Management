import {   NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';
import { destroy } from '@global/helpers/cloudinary-upload';

// Admin user Activity
export class DeleteUser  {
  public static read = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
     const user = await UserModel.findById(req.params.id);
     if(!user){
      return next(new ErrorHandler('User not found', HTTP_STATUS.NOT_FOUND));
     }
     if(user?.profile?.avatar){
      await destroy(user.profile.avatar.public_id);
    }

    await UserModel.deleteOne({ _id: user._id});

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User Deleted Successfully...'
    });

  });
}
