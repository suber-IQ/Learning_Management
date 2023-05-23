import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import { Types } from 'mongoose';
import { Code } from '@course/courseInterface/courseInterface';
import { createCodeSnippetSchema } from '@course/courseSchemes/document/codes/create.code.snippet.schema';

// Admin user Activity
export class CreateCodeSnippet  {
  @joiValidation(createCodeSnippetSchema)
  public static create = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, lessonId } = req.params;
    const { title, language, code } = req.body;


    // Find the course by ID
    const course = await CourseModel.findById(courseId);

    if(!course){
      return next(new ErrorHandler('Course not found!',HTTP_STATUS.NOT_FOUND));
    }

    // Find the lesson by Id in the course
    const lesson = course.lessons.find((lesson) => lesson._id === lessonId);

    if(!lesson){
      return next(new ErrorHandler('Lesson not found!',HTTP_STATUS.NOT_FOUND));
    }

     const codeSnippet: Code = {
       _id: new Types.ObjectId().toString(),
       title,
       language,
       code
     };

    //  Add the code Snippet to the lesson
    lesson.codes.push(codeSnippet);

  await course.save();

   res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Code Snippet Created Successfully...',
    code: codeSnippet
   });

  });
}
