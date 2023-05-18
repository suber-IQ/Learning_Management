import {  NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@root/shared/middleware/catchAsyncError';
import sendToken from '@root/shared/utils/jsonwebtoken/jwt-token';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { loginSchema } from '@user/userSchemes/login.schema';
import { IUser } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import ErrorHandler from '@global/helpers/error-handler';


export class Login {
  @joiValidation(loginSchema)
  public static read = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

      const { usernameOrEmail, password } = req.body;

      // Check if the user exists with the provided username or email
      const user: IUser | null = await UserModel.findOne({
        $or: [{username: usernameOrEmail}, { email: usernameOrEmail}]
      });
       if(!user){
          return next(new ErrorHandler('Invalid credentials',HTTP_STATUS.UNAUTHORIZED));
       }

      // Compare Passwords
      const isPasswordMatch = await user.comparePassword(password);
      if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid credentials',HTTP_STATUS.UNAUTHORIZED));
      }

      sendToken(user,HTTP_STATUS.OK,res);
  });
}
