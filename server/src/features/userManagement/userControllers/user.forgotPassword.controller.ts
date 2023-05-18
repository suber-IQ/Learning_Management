import {  NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@root/shared/middleware/catchAsyncError';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { forgotPasswordSchema } from '@user/userSchemes/forgotPassword.schema';
import { IUser } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';
import sendEmail from '@root/shared/utils/email/send-email';
import { forgotPasswordTemplate } from '@root/shared/utils/email/forgot-password-template';


export class ForgotPassword {
  @joiValidation(forgotPasswordSchema)
  public static update = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         const { usernameOrEmail } = req.body;

       const user: IUser | null = await UserModel.findOne<IUser>({
        $or: [{ email: usernameOrEmail}, {username: usernameOrEmail}]
       });

       if(!user){
        return next(new ErrorHandler('User not found!',HTTP_STATUS.NOT_FOUND));
       }

      //  Get ResetPassword Token
      const resetToken = user.getResetPasswordToken();

      await user.save({ validateBeforeSave: false});

      const resetPasswordUrl = `${req.protocol}://${req.get('host')}api/v1/user/password/reset/${resetToken}`;


      const htmlMessage = forgotPasswordTemplate.passwordResetTemplate(user.email || user.username,resetPasswordUrl);

      try {
        await sendEmail({
          email: user.email,
          subject: 'Learning Management Password Recovery',
          message: htmlMessage
        });

        res.status(HTTP_STATUS.OK).json({
          success: true,
          message: `Email send to ${user.email} Successfully...`
        });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save({ validateBeforeSave: false });
          return next(new ErrorHandler(error.message,HTTP_STATUS.INTERNAL_SERVER_ERROR));
      }

  });
}
