import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { Assignment, ICourse, Lesson } from '@course/courseInterface/courseInterface';
import { createAssignmentSchema } from '@course/courseSchemes/document/assignments/create.assignment.schema';
import { Types } from 'mongoose';

// Admin user Activity
export class CreateAssignment  {
  @joiValidation(createAssignmentSchema)
  public static create = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
       const { courseId, lessonId } = req.params;

       const { title, description, deadline  } = req.body;

      //  Find the course by ID
      const course: ICourse | null = await CourseModel.findById(courseId);

      if(!course){
        return next(new ErrorHandler('Course not found!', HTTP_STATUS.NOT_FOUND));
      }

      // Find the Lesson by ID
      const lesson: Lesson | undefined = course.lessons.find((lesson) => lesson._id === lessonId);

      if(!lesson){
        return next(new ErrorHandler('Lesson not found!', HTTP_STATUS.NOT_FOUND));
      }

      const assignment: Assignment = {
        _id: new Types.ObjectId().toString(),
        title,
        description,
        deadline,
      };


      // Add the assignment to the lesson
      lesson.assignments.push(assignment);

      await course.save();

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Assignment created successfully',
        assignment
      });

  });
}
