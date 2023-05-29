import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import {  Slide } from '@course/courseInterface/courseInterface';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import { uploads } from '@global/helpers/cloudinary-upload';
import { Types } from 'mongoose';
import { createSlideSchema } from '@course/courseSchemes/document/slides/create.slide.schema';

// Admin user Activity
export class CreateSlide  {
  @joiValidation(createSlideSchema)
  public static create = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
       const { courseId, lessonId } = req.params;
       const { title } = req.body;

      //  find the course by Id
     const course = await CourseModel.findById(courseId);

     if(!course){
      return next(new ErrorHandler('Course not found!',HTTP_STATUS.NOT_FOUND));
     }

    //  find the lesson by id in the course
    const lesson = course.lessons.find((less) => less._id === lessonId);

    if(!lesson){
      return next(new ErrorHandler('Lesson not found!',HTTP_STATUS.NOT_FOUND));
    }

    let lessonSlideUrl = '';
    let lessonSlideId = '';

    if (req.file) {
     const uploadResult = await uploads(req.file.path);
     lessonSlideUrl = uploadResult?.secure_url;
     lessonSlideId = uploadResult?.public_id;

     // Delete the uploaded file after successfull upload
     deleteUploadedFile(req.file?.path);
   }

    const newSlide: Slide = {
      _id: new Types.ObjectId().toString(),
      title,
      file: {
        public_id: lessonSlideId,
        url: lessonSlideUrl
      }
    };

    lesson.slides.push(newSlide);

     // Save the course with the Slide
     await course.save();

  res.status(HTTP_STATUS.CREATED).json({
   success: true,
   message: 'Slide Upload Successfully...',
   slide: newSlide
  });

  });
}
