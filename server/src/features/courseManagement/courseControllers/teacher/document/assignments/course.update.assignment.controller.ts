import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { Assignment, ICourse, Lesson } from '@course/courseInterface/courseInterface';
import { updateAssignmentSchema } from '@course/courseSchemes/document/assignments/update.assignment.schema';

// Admin user Activity
export class UpdateAssignment  {
  @joiValidation(updateAssignmentSchema)
  public static update = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
       const { courseId, lessonId, assignmentId } = req.params;

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

      // Find the Assignment by ID
      const assignment: Assignment | undefined = lesson.assignments.find((assign) => assign._id === assignmentId);

      if(!assignment){
        return next(new ErrorHandler('Assignment not found!', HTTP_STATUS.NOT_FOUND));
      }

    // update assignment fields
    assignment.title = title;
    assignment.description = description;
    assignment.deadline = deadline;

    await course.save();


      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Assignment updated successfully',
        assignment
      });

  });
}
