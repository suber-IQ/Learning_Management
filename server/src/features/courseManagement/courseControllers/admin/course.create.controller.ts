import HTTP_STATUS from 'http-status-codes';
import {   Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { createCourseSchema } from '@course/courseSchemes/createCourse.schema';
import { uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import CourseModel from '@course/courseModel/course.model';

// Admin user Activity
export class CreateCourse  {
  @joiValidation(createCourseSchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {
      title,
      description,
      level,
      price,
      category,
      createdBy,
      code,
      discount,
    } = req.body;


    let coursePosterUrl: string | undefined;
    let coursePosterId: string | undefined;

    if (req.file) {
     const uploadResult = await uploads(req.file.path);
     coursePosterUrl = uploadResult?.secure_url;
     coursePosterId = uploadResult?.public_id;

     // Delete the uploaded file after successfull upload
     deleteUploadedFile(req.file?.path);
   }


   // create new user object

   await CourseModel.create({
    title,
    description,
    level,
    price,
    category,
    poster: {
      public_id: coursePosterId,
      url: coursePosterUrl,
    },
    createdBy,
    createdAt: new Date(),
    coupon: {
      code,
      discount
    }
   });

   res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Course Created Successfully...'
   });

  });
}
