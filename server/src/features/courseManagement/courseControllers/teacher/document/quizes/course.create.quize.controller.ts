import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import {  Question, Quiz } from '@course/courseInterface/courseInterface';
import { createCodeSnippetSchema } from '@course/courseSchemes/document/codes/create.code.snippet.schema';

// Admin user Activity
export class CreateQuiz  {
  @joiValidation(createCodeSnippetSchema)
  public static create = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, lessonId } = req.params;
    const { title, question, optionA,optionB,optionC,optionD,explanation,answer} = req.body;


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

    const quizeQuestion: Question = {
      text: question,
      options: [optionA,optionB,optionC,optionD],
      explanation,
      answer
    };

     const newQuize: Quiz = {
       title,
       questions:[quizeQuestion]
     };

   // Add the quiz to the lesson
    lesson.quizzes.push(newQuize);

    await course.save();

   res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Quiz Created Successfully...',
    quiz: newQuize
   });

  });
}
