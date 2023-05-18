import {   NextFunction, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { AuthRequest, IUser } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { updatePasswordSchema } from '@user/userSchemes/updatePassword.schema';
import sendToken from '@root/shared/utils/jsonwebtoken/jwt-token';


export class UpdateUserPassword {
  @joiValidation(updatePasswordSchema)
  public static update = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
      const user = await UserModel.findById(req.user?.id).select('+password') as IUser;
      const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

      if(!isPasswordMatched){
        return next(new ErrorHandler('Old Password is incorrect',HTTP_STATUS.NOT_FOUND));
      }

     user.password = req.body.newPassword;
     await user.save();



     sendToken(user,HTTP_STATUS.OK,res);
  });
}
