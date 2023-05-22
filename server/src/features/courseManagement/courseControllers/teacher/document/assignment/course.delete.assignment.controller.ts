import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import {  ICourse, Lesson } from '@course/courseInterface/courseInterface';
import { deleteAssignmentSchema } from '@course/courseSchemes/document/assignments/delete.assignment.schema';

// Admin user Activity
export class DeleteAssignment  {
  @joiValidation(deleteAssignmentSchema)
  public static delete = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
       const { courseId, lessonId, assignmentId } = req.params;

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

      // Find the index of the Assignment by ID
      const assignmentIndex: number = lesson.assignments.findIndex((assign) => assign._id === assignmentId);

      if(assignmentIndex === -1){
        return next(new ErrorHandler('Assignment not found!', HTTP_STATUS.NOT_FOUND));
      }

    // Remove the assignment from the lesson
    lesson.assignments.splice(assignmentIndex,1);

    await course.save();


      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Assignment deleted successfully',
      });

  });
}
