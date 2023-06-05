import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { ICourse } from '@course/courseInterface/courseInterface';
import { Lesson } from '@course/courseInterface/courseInterface';
import { getAllLessonSchema } from '@course/courseSchemes/course/getLessons.schema';

// Admin user Activity
export class GetCourseLessons  {
  @joiValidation(getAllLessonSchema)
  public static get = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    const { courseId } = req.params;

    const course: ICourse | null = await CourseModel.findById(courseId);

    if (!course) {
          return next(new ErrorHandler('Course not found',HTTP_STATUS.NOT_FOUND));
    }

    const lessonss: Lesson[] = course.lessons;

    course.views += 1;
    await course.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      lessonss
    })
   
  });
}
