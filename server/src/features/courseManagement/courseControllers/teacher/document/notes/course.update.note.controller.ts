import HTTP_STATUS from 'http-status-codes';
import { NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { destroy, uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import CourseModel from '@course/courseModel/course.model';
import { AuthRequest } from '@user/userInterface/user.interface';
import { Attachment } from '@course/courseInterface/courseInterface';
import ErrorHandler from '@global/helpers/error-handler';
import { updateNoteSchema } from '@course/courseSchemes/document/notes/update.note.schema';

// Admin user Activity
export class UpdateNote {
  @joiValidation(updateNoteSchema)
  public static update = catchAsyncHandler(
    async (
      req: AuthRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const { courseId, lessonId, noteId } = req.params;
      const { title, content, tags } = req.body;

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

      //  Find the note by Id in the lesson
      const note = lesson.notes.find((note) => note._id === noteId);

      if (!note) {
        return next(new ErrorHandler('Note not found!', HTTP_STATUS.NOT_FOUND));
      }

      // Destroy the previous attachments from cloudinary if they exist
      for (const attachment of note.attachments) {
        await destroy(attachment.file_public_id);
      }

      // Upload the new file attachment to cloudinary
      let newAttachment: Attachment | undefined = undefined;

      if (req.file) {
        const uploadResult = await uploads(req.file.path);

        newAttachment = {
          file_public_id: uploadResult?.public_id,
          file_url: uploadResult?.secure_url,
        };

        // Delete the uploaded file after successfull upload
        await deleteUploadedFile(req.file.path);
      }

      // Update the note properties
      note.title = title;
      note.content = content;
      note.tags = tags;

      // update the note attachment if a new attachment was uploaded
      if (newAttachment) {
        note.attachments = [newAttachment];
      }

      // Save the course with the updated note
      await course.save();

      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Note Created Successfully...',
        note,
      });
    }
  );
}
