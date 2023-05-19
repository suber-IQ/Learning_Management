import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { destroy } from '@global/helpers/cloudinary-upload';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { ICourse } from '@course/courseInterface/courseInterface';

// Admin user Activity
export class DeleteCourse  {
  public static delete = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
     const { id } = req.params;

     const course = await CourseModel.findById<ICourse>(id);

     if(!course){
        return next(new ErrorHandler('Course not Found!',HTTP_STATUS.NOT_FOUND));
     }

     if(course.poster.public_id){
      await destroy(course.poster.public_id);
    }

    for(let i = 0; i < course.lessons.length; i++){
       const singleLesson = course.lessons[i];

        await destroy(singleLesson.content.public_id,'video');
    }

    await CourseModel.deleteOne({ _id: course._id});

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Course Deleted Successfully...'
    });

  });
}
