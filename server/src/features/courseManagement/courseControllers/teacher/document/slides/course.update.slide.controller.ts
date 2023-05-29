import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import { destroy, uploads } from '@global/helpers/cloudinary-upload';
import { updateSlideSchema } from '@course/courseSchemes/document/slides/update.slide.schema';

// Admin user Activity
export class UpdateSlide  {
  @joiValidation(updateSlideSchema)
  public static update = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, lessonId, slideId } = req.params;
    const { title } = req.body;

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

    //  Get the previous slide
      const previousSlide = lesson.slides[slideIndex];

      // Delete the previous file from cloudinary
      if(previousSlide.file.public_id){
        await destroy(previousSlide.file.public_id);
      }

    let newSlideUrl = '';
    let newSlideId = '';

    if (req.file) {
     const uploadResult = await uploads(req.file.path);
     newSlideUrl = uploadResult?.secure_url;
     newSlideId = uploadResult?.public_id;

     // Delete the uploaded file after successfull upload
     deleteUploadedFile(req.file?.path);
   }

  //  Update the slide's title and file
    lesson.slides[slideIndex].title = title;
    lesson.slides[slideIndex].file = {
      public_id: newSlideId,
      url: newSlideUrl
    };

     // Save the course with the Slide
     await course.save();

  res.status(HTTP_STATUS.CREATED).json({
   success: true,
   message: 'Slide Updated Successfully...',
   slide: lesson.slides[slideIndex]
  });

  });
}
