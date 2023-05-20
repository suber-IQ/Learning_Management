import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { Assignment, ICourse } from '@course/courseInterface/courseInterface';
import {  Types } from 'mongoose';
import { createAssignmentSchema } from '@course/courseSchemes/createAssignment.schema';

// Admin user Activity
export class CreateAssignment  {
  @joiValidation(createAssignmentSchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    const {courseId} = req.params;
    const { title, description, deadline } = req.body;

    const course = await CourseModel.findById<ICourse>(courseId);

    if(!course){
      return next(new ErrorHandler('Course not found!',HTTP_STATUS.NOT_FOUND));
    }

    const assignment: Assignment = {
      _id: new Types.ObjectId().toString(),
      title,
      description,
      deadline,
    };

    course.assignments.push(assignment);
    await course.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Assignment created successfully',
      assignment
    });

  });
}
