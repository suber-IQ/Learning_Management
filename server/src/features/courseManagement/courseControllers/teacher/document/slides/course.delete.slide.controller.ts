import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import { destroy } from '@global/helpers/cloudinary-upload';
import { deleteSlideSchema } from '@course/courseSchemes/document/slides/delete.slide.schema';

// Admin user Activity
export class DeleteSlide  {
  @joiValidation(deleteSlideSchema)
  public static delete = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, lessonId, slideId } = req.params;

      //  find the course by Id
     const course = await CourseModel.findById(courseId);

     if(!course){
      return next(new ErrorHandler('Course not found!',HTTP_STATUS.NOT_FOUND));
     }

    //  find the lesson by id in the course
    const lesson = course.lessons.find((less) => less._id === lessonId);

    if(!lesson){
      return next(new ErrorHandler('Lesson not found!',HTTP_STATUS.NOT_FOUND));
    }

     //  Find the Slide by Id in the lesson
     const slideIndex = lesson.slides.findIndex((sld) => sld._id === slideId);

     if (slideIndex === -1) {
       return next(new ErrorHandler('Slide not found!', HTTP_STATUS.NOT_FOUND));
     }

   //  get the slide to be deleted
    const slideToDelete = lesson.slides[slideIndex];

   // if the slide to has a file, delete it from cludinary
   if(slideToDelete.file.public_id){
    await destroy(slideToDelete.file.public_id);
   }

   // Remove the slide from the lesson
   lesson.slides.splice(slideIndex,1);

     // Save the course with the Slide
     await course.save();

  res.status(HTTP_STATUS.CREATED).json({
   success: true,
   message: 'Slide Deleted Successfully...',

  });

  });
}
