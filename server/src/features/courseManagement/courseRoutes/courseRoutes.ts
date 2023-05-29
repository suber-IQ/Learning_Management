import express, { Router } from 'express';
import { CreateCourse } from '@course/courseControllers/teacher/course/course.create.controller';
import AuthMiddleware from '@middleware/auth.middleware';

import { UserRole } from '@user/userInterface/user.interface';
import { AddLesson } from '@course/courseControllers/teacher/course/course.addLesson.controller';
import { DeleteCourse } from '@course/courseControllers/teacher/course/course.deleteCourse.controller';
import { DeleteLesson } from '@course/courseControllers/teacher/course/course.deleteLesson.controller';
import { CreateAssignment } from '@course/courseControllers/teacher/document/assignments/course.create.assignment.controller';
import { UpdateAssignment } from '@course/courseControllers/teacher/document/assignments/course.update.assignment.controller';
import { DeleteAssignment } from '@course/courseControllers/teacher/document/assignments/course.delete.assignment.controller';
import { CreateNote } from './../courseControllers/teacher/document/notes/course.create.note.controller';
import { UpdateNote } from '@course/courseControllers/teacher/document/notes/course.update.note.controller';
import { DeleteNote } from '@course/courseControllers/teacher/document/notes/course.delete.note.controller';
import { CreateCodeSnippet } from '@course/courseControllers/teacher/document/codes/course.create.code.snippet.conrollter';
import { UpdateCodeSnippet } from '@course/courseControllers/teacher/document/codes/course.update.code.snippet.controller';
import { DeleteCodeSnippet } from '@course/courseControllers/teacher/document/codes/course.delete.code.snippet.controller';
import { CreateSlide } from '@course/courseControllers/teacher/document/slides/course.create.slide.controller';
import { UpdateSlide } from '@course/courseControllers/teacher/document/slides/course.update.slide.controller';
import { DeleteSlide } from '@course/courseControllers/teacher/document/slides/course.delete.slide.controller';
import { CreateQuiz } from '@course/courseControllers/teacher/document/quizes/course.create.quize.controller';
import { UpdateQuiz } from '@course/courseControllers/teacher/document/quizes/course.update.quize.controller';
import { DeleteQuiz } from '@course/courseControllers/teacher/document/quizes/course.delete.quize.controller';


class CourseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.teacherRoutes();
    this.Student();  // Student or user
    return this.router;
  }

 private Student(): void {
  // Assignment submission folder:-features/courseManagement/courseController/student
  // this.router.put('/course/assignment/submit/:courseId/:assignmentId',AuthMiddleware.isAuthenticateUser, SubmitAssignment.update);
 }

  private teacherRoutes(): void {
    // Teacher course and lecture (add course and lesson , delete lecture or lesson and course) folder:-features/courseManagement/courseController/teacher/course
    this.router.post('/course/create',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateCourse.create);
    this.router.post('/course/lesson/:courseId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), AddLesson.create);
    this.router.delete('/course/:courseId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteCourse.delete);
    this.router.delete('/course/lesson/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteLesson.delete);

    // Assignment (create, update, delete) folder:-features/courseManagement/courseController/teacher/document/assignment
    this.router.post('/course/lesson/create/assignment/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateAssignment.create);
    this.router.put('/course/lesson/update/assignment/:courseId/:lessonId/:assignmentId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), UpdateAssignment.update);
    this.router.delete('/course/lesson/delete/assignment/:courseId/:lessonId/:assignmentId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteAssignment.delete);

    // note (create, update, delete) folder:-features/courseManagement/courseController/teacher/document/notes
    this.router.post('/course/lesson/create/note/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateNote.create);
    this.router.put('/course/lesson/update/note/:courseId/:lessonId/:noteId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), UpdateNote.update);
    this.router.delete('/course/lesson/delete/note/:courseId/:lessonId/:noteId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteNote.delete);

    // Quiz (create, update, delete) folder:-features/courseManagement/courseController/teacher/document/Quizes
    this.router.post('/course/lesson/create/quiz/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateQuiz.create);
    this.router.put('/course/lesson/update/quiz/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), UpdateQuiz.update);
    this.router.delete('/course/lesson/delete/quiz/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteQuiz.delete);

    // code (create, update, delete) folder:-features/courseManagement/courseController/teacher/document/codes
    this.router.post('/course/lesson/create/code/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateCodeSnippet.create);
    this.router.put('/course/lesson/update/code/:courseId/:lessonId/:codeSnippetId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), UpdateCodeSnippet.update);
    this.router.delete('/course/lesson/delete/code/:courseId/:lessonId/:codeSnippetId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteCodeSnippet.delete);

    // Slide (create, update, delete) folder:-features/courseManagement/courseController/teacher/document/slides
    this.router.post('/course/lesson/create/slide/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateSlide.create);
    this.router.put('/course/lesson/update/slide/:courseId/:lessonId/:slideId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), UpdateSlide.update);
    this.router.delete('/course/lesson/delete/slide/:courseId/:lessonId/:slideId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteSlide.delete);


  }


}

export const courseRoutes: CourseRoutes = new CourseRoutes();
