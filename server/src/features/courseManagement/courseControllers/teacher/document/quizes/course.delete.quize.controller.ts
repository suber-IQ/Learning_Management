import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import { deleteQuizSchema } from '@course/courseSchemes/document/quizes/delete.quiz.schema';

// Admin user Activity
export class DeleteQuiz  {
  @joiValidation(deleteQuizSchema)
  public static delete = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, lessonId } = req.params;


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

    // Delete the quizzes object from the lesson
    lesson.quizzes.splice(0,lesson.quizzes.length);

    await course.save();

   res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Quizzes deleted successfully from the lesson.',
   });

  });
}
