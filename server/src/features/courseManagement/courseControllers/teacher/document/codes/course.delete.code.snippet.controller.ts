import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import {  ICourse, Lesson } from '@course/courseInterface/courseInterface';
import { deleteCodeSnippetSchema } from '@course/courseSchemes/document/codes/delete.code.snippet.schema';

// Admin user Activity
export class DeleteCodeSnippet  {
  @joiValidation(deleteCodeSnippetSchema)
  public static delete = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
       const { courseId, lessonId, codeSnippetId } = req.params;

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
      const codeSnippetIndex: number = lesson.codes.findIndex((cod) => cod._id === codeSnippetId);

      if(codeSnippetIndex === -1){
        return next(new ErrorHandler('Code Snippet not found!', HTTP_STATUS.NOT_FOUND));
      }

    // Remove the assignment from the lesson
    lesson.codes.splice(codeSnippetIndex,1);

     await course.save();

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Code Snippet deleted successfully',
      });

  });
}
