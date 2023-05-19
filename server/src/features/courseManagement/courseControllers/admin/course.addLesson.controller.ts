import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { videoUpload } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { addLessonSchema } from '@course/courseSchemes/addLesson.schema';
import { ICourse } from '@course/courseInterface/courseInterface';
import { Types } from 'mongoose';

// Admin user Activity
export class AddLesson  {
  @joiValidation(addLessonSchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { title, description, duration } = req.body;

    const course = await CourseModel.findById<ICourse>(id);

    if(!course){
       return next(new ErrorHandler('Course not Found!',HTTP_STATUS.NOT_FOUND));
    }

    let lessonUrl = '';
    let lessonId = '';

    if (req.file) {
     const uploadResult = await videoUpload(req.file.path);
     lessonUrl = uploadResult?.secure_url;
     lessonId = uploadResult?.public_id;

     // Delete the uploaded file after successfull upload
     deleteUploadedFile(req.file?.path);
   }


   // create new user object
  course.lessons.push({
    _id: new Types.ObjectId().toString(),
    title,
    description,
    duration,
    content: {
       public_id: lessonId,
       url: lessonUrl
    }
  });

  course.numberOflesson =  course.lessons.length;

  await course.save();

   res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Lesson Added in Course'
   });

  });
}
