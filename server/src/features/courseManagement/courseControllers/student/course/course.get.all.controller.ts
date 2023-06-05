import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { ICourse } from '@course/courseInterface/courseInterface';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { getAllCourseSchema } from '@course/courseSchemes/course/getCourse.schema';

// Admin user Activity
export class GetAllCourse  {
  @joiValidation(getAllCourseSchema)
  public static get = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
      const keyword = req.query.keyword || '';
      const category = req.query.category || '';
      const courses: ICourse[] = await CourseModel.find({
        title: {
          $regex: keyword,
          $options: 'i',
        },
        category: {
                  $regex: category,
                  $options: 'i',
        },
      }).select('-lessons');
      
      if(!courses){
        return next(new ErrorHandler("No Courses Found!",HTTP_STATUS.NOT_FOUND));
      }

      res.status(HTTP_STATUS.OK).json({
        success: true,
        courses,
      })
  });
}
