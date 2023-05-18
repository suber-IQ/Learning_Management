import {  NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import sendToken from '@root/shared/utils/jsonwebtoken/jwt-token';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { IUser } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';
import { resetPasswordSchema } from '@user/userSchemes/resetPassword.schema';


export class ResetPassword {
  @joiValidation(resetPasswordSchema)
  public static update  = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  // creating token hash
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user: IUser | null = await UserModel.findOne<IUser>({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user){
    return next(new ErrorHandler('Reset Password Token is invalid or has been expired',HTTP_STATUS.BAD_REQUEST));
  }

  if(req.body.password != req.body.confirmPassword){
      return next(new ErrorHandler('Password does not match', HTTP_STATUS.BAD_REQUEST));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user,HTTP_STATUS.OK,res);

  });
}
