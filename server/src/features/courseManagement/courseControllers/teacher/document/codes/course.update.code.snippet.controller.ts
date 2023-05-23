import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Request, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import {  Code, ICourse, Lesson } from '@course/courseInterface/courseInterface';
import { updateCodeSnippetSchema } from '@course/courseSchemes/document/codes/update.code.snippet.schema';

// Admin user Activity
export class UpdateCodeSnippet  {
  @joiValidation(updateCodeSnippetSchema)
  public static update = catchAsyncHandler(async (req: Request, res: Response,next: NextFunction): Promise<void> => {
       const { courseId, lessonId, codeSnippetId } = req.params;

       const { title, language, code } = req.body;

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

      // Find the Codes Snippet by ID
      const codeSnippet: Code | undefined = lesson.codes.find((cod) => cod._id === codeSnippetId);

      if(!codeSnippet){
        return next(new ErrorHandler('codeSnippetId not found!', HTTP_STATUS.NOT_FOUND));
      }

    // update assignment fields
     codeSnippet.title = title;
     codeSnippet.language = language;
     codeSnippet.code = code;

     await course.save();

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Code Snippet updated successfully',
        codeSnippet
      });

  });
}
