import {  NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@root/shared/middleware/catchAsyncError';
import { registerSchema } from '@user/userSchemes/register.schema';
import sendToken from '@root/shared/utils/jsonwebtoken/jwt-token';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import ErrorHandler from '@global/helpers/error-handler';
import UserModel from '@user/userModel/user.model';
import { uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';


export class Register {
  @joiValidation(registerSchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       const { username, email, password, firstName, lastName } = req.body;

       const existingUser = await UserModel.findOne({ $or: [{ username}, {email}]});
       if(existingUser){
         return next(new ErrorHandler('invalid credentials',HTTP_STATUS.UNAUTHORIZED));
       }

       let profileImageUrl: string | undefined;
       let profileImageId: string | undefined;

       if (req.file) {
        const uploadResult = await uploads(req.file.path);
        profileImageUrl = uploadResult?.secure_url;
        profileImageId = uploadResult?.public_id;

        // Delete the uploaded file after successfull upload
        deleteUploadedFile(req.file?.path);
      }


      // create new user object
      const user = new UserModel({
        username,
        email,
        password,
        profile: {
          firstName,
          lastName,
          avatar: {
            public_id: profileImageId,
            url: profileImageUrl
          },
        }
      });

      //Save user to database
      await user.save();


      sendToken(user,HTTP_STATUS.CREATED,res);
  });
}
