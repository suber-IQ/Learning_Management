import { NextFunction, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { AuthRequest, IUser, UserRole } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { updateProfileSchema } from '@user/userSchemes/updateProfile.schema';
import { destroy, uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import ErrorHandler from '@global/helpers/error-handler';


export class UpdateUserProfile {
  @joiValidation(updateProfileSchema)
  public static update = catchAsyncHandler(async (req: AuthRequest, res: Response,next: NextFunction): Promise<void> => {
    const { username,email,firstName,lastName, age,role } = req.body;

    if(role !== UserRole.User && role !== UserRole.Teacher){
      return next(new ErrorHandler('Role must be either "teacher" or "user".',HTTP_STATUS.FORBIDDEN));
    }


    const newUserData: Partial<IUser> = {
      username,
      email,
      role,
      profile: {
        firstName,
        lastName,
        age
      }
    };



    // we will add cloudinary
   if(req.file){
      const user = await UserModel.findById<IUser>(req.user?.id);


      const imageId = user?.profile?.avatar?.public_id;
      if(imageId !== undefined){
        await destroy(imageId);
      }


      const uploadResult = await uploads(req.file.path);
      newUserData.profile = {
        avatar: {
          public_id: uploadResult?.public_id,
          url: uploadResult?.secure_url,
        }
      };

      // Delete the uploaded file after successfull upload
     await deleteUploadedFile(req.file?.path);
   }

   await UserModel.findByIdAndUpdate<IUser>(req.user?.id,newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

   res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Update User Profile Successfully...'
   });

  });
}
