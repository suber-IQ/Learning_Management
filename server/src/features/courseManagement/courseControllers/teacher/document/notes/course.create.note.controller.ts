import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import { Attachment, Note } from '@course/courseInterface/courseInterface';
import ErrorHandler from '@global/helpers/error-handler';
import { createNoteSchema } from '@course/courseSchemes/document/notes/create.note.schema';
import { Types } from 'mongoose';

// Admin user Activity
export class CreateNote  {
  @joiValidation(createNoteSchema)
  public static create = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const { courseId, lessonId } = req.params;
    const { title, content, tags } = req.body;


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

    let lessonNotesUrl = '';
    let lessonNotesId = '';

    if (req.file) {
     const uploadResult = await uploads(req.file.path);
     lessonNotesUrl = uploadResult?.secure_url;
     lessonNotesId = uploadResult?.public_id;

     // Delete the uploaded file after successfull upload
     deleteUploadedFile(req.file?.path);
   }

   const attachment: Attachment = {
    file_public_id: lessonNotesId,
    file_url: lessonNotesUrl
   };

  //  create a new note object
  const newNote: Note = {
    _id: new Types.ObjectId().toString(),
     title,
     content,
     createdDate: new Date(),
     tags: [tags],
     attachments: [attachment]
  };

  // Add the new notes to the lesson
  lesson.notes.push(newNote);

  // Save the course with the updated notes
  await course.save();

   res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Note Created Successfully...',
    note: newNote
   });

  });
}
