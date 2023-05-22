import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { destroy } from '@global/helpers/cloudinary-upload';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { deleteLessonSchema } from '@course/courseSchemes/course/deleteLesson.schema';

// Admin user Activity
export class DeleteLesson  {
  @joiValidation(deleteLessonSchema)
  public static delete = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
      const { courseId, lessonId } = req.params;
      const course = await CourseModel.findById(courseId);

      if(!course){
        return next(new ErrorHandler('Course not Found!',HTTP_STATUS.NOT_FOUND));

      }

      const lesson = course.lessons.find(item => {
         if(item._id.toString() === lessonId?.toString()) return item;
      });

      if(lesson){
        await destroy(lesson?.content.public_id,'video');
      }

      course.lessons = course.lessons.filter(item => {
        if(item._id.toString() !== lessonId?.toString()) return item;
      });

      course.numberOflesson = course.lessons.length;

      await course.save();

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Lecture Deleted Successfully...'
      });
  });
}
