import HTTP_STATUS from 'http-status-codes';
import {   NextFunction, Response } from 'express';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import CourseModel from '@course/courseModel/course.model';
import ErrorHandler from '@global/helpers/error-handler';
import { AssignmentSubmission, ICourse } from '@course/courseInterface/courseInterface';
import UserModel from '@user/userModel/user.model';
import { uploads } from '@global/helpers/cloudinary-upload';
import { deleteUploadedFile } from '@global/helpers/delete-upload-file';
import { AuthRequest, IUser } from '@user/userInterface/user.interface';
import { submitAssignmentSchema } from '@course/courseSchemes/submitAssignment.schema';

// Admin user Activity
export class SubmitAssignment  {
  @joiValidation(submitAssignmentSchema)
  public static update = catchAsyncHandler(async (req: AuthRequest, res: Response,next: NextFunction): Promise<void> => {
   const { courseId, assignmentId} = req.params;
   const student = await UserModel.findById(req.user?.id) as IUser;


    // Find the course by CourseId
    let submissionUrl = '';
    let submissionId = '';

    if (req.file) {
     const uploadResult = await uploads(req.file.path);
     submissionUrl = uploadResult?.secure_url;
     submissionId = uploadResult?.public_id;

     // Delete the uploaded file after successfull upload
     deleteUploadedFile(req.file?.path);
   }

    const course = await CourseModel.findById<ICourse>(courseId);

    if(!course){
      return next(new ErrorHandler('Course not found!',HTTP_STATUS.NOT_FOUND));
    }

    const assignment = course.assignments.find((assign) => assign._id.toString() === assignmentId);

    if(!assignment){
      return next(new ErrorHandler('Assignment not found!',HTTP_STATUS.NOT_FOUND));

    }

   const submission: AssignmentSubmission = {
    studentId: student?._id,
    studentUsername: student ? student.username : '',
    submissionDate: new Date(),
    file: {
      public_id: submissionId,
      url: submissionUrl
    }
   };

   assignment.submissions?.push(submission);

   await course.save();

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Assignment Submitted successfully',
    });

  });
}
