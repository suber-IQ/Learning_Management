import {  NextFunction, Request, Response } from 'express';
import { v2 as cloudinary} from 'cloudinary';
import HTTP_STATUS from 'http-status-codes';
import { promisify } from 'util';
import catchAsyncHandler from '@root/shared/middleware/catchAsyncError';
import { registerSchema } from '@user/userSchemes/register.schema';
import sendToken from '@root/shared/utils/jwt-token';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import ErrorHandler from '@global/helpers/error-handler';
import UserModel from '@user/userModel/user.model';

const cloudinaryUpload = promisify(cloudinary.uploader.upload);

export class Register {
  @joiValidation(registerSchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       const { username, email, password, firstName, lastName } = req.body;

       const existingUser = await UserModel.findOne({ $or: [{ username}, {email}]});
       if(existingUser){
         return next(new ErrorHandler('invalid credentials',HTTP_STATUS.UNAUTHORIZED));
       }

      //  upload avatar to cloudinary (if Provided)
      let avatarUrl: string | undefined;
      if(req.file){
        const result = await cloudinaryUpload(req.file.buffer.toString('base64'));
        avatarUrl = result?.secure_url;
      }

      // create new user object
      const user = new UserModel({
        username,
        email,
        password,
        profile: {
          firstName,
          lastName,
          avatar: avatarUrl,
        }
      });

      //Save user to database
      await user.save();


      sendToken(user,HTTP_STATUS.CREATED,res);
  });
}
