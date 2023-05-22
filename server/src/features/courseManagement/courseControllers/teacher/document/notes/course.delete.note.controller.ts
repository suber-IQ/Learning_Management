import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { destroy } from '@global/helpers/cloudinary-upload';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import { Attachment } from '@course/courseInterface/courseInterface';
import ErrorHandler from '@global/helpers/error-handler';
import { deleteNoteSchema } from '@course/courseSchemes/document/notes/delete.note.schema';

// Admin user Activity
export class DeleteNote {
  @joiValidation(deleteNoteSchema)
  public static delete = catchAsyncHandler(
    async (
      req: AuthRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { courseId, lessonId, noteId } = req.params;

      // Find the course by ID
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(
          new ErrorHandler('Course not found!', HTTP_STATUS.NOT_FOUND)
        );
      }

      // Find the lesson by Id in the course
      const lesson = course.lessons.find((lesson) => lesson._id === lessonId);

      if (!lesson) {
        return next(
          new ErrorHandler('Lesson not found!', HTTP_STATUS.NOT_FOUND)
        );
      }

      // Find the note by Id in the lesson
      const noteIndex = lesson.notes.findIndex((note) => note._id === noteId);

      if (noteIndex === -1) {
        return next(new ErrorHandler('Note not found!', HTTP_STATUS.NOT_FOUND));
      }

      const note = lesson.notes[noteIndex];

      // Delete attachments from Cloudinary
      await Promise.all(
        note.attachments.map(async (attachment: Attachment) => {
          await destroy(attachment.file_public_id);
        })
      );

      // Remove the note from the lesson
      lesson.notes.splice(noteIndex,1);

      // save the course with the delete lesson
       await course.save();



      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Note Deleted Successfully...',
        note,
      });
    }
  );
}
