import { Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { AuthRequest, IUser } from '@user/userInterface/user.interface';
import UserModel from '@user/userModel/user.model';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { updateProfileSchema } from '@user/userSchemes/updateProfile.schema';
import { destroy, uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';


export class UpdateUserProfile {
  @joiValidation(updateProfileSchema)
  public static update = catchAsyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
    const { username,email,firstName,lastName, age } = req.body;

    const newUserData: Partial<IUser> = {
      username,
      email,
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
