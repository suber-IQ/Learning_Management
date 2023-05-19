import {   Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { AuthRequest } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import { destroy } from '@global/helpers/cloudinary-upload';


export class DeleteMeProfile {
  public static delete = catchAsyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
     const user = await UserModel.findById(req.user?.id);
     if(user?.profile?.avatar){
       await destroy(user.profile.avatar.public_id);
     }

    //  Cancel Subscription

      await UserModel.deleteOne({_id: user?._id});

      res.status(HTTP_STATUS.OK).cookie('token',null, {
        expires: new Date(Date.now())
      }).json({
        success: true,
        message: 'User Deleted Successfully...'
      });

  });
}
