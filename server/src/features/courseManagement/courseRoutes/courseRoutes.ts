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

    // Assignment (create, update, delete) folder:-features/courseManagement/courseController/teacher/document/notes
    this.router.post('/course/lesson/create/note/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateNote.create);
    this.router.put('/course/lesson/update/note/:courseId/:lessonId/:noteId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), UpdateNote.update);
    this.router.delete('/course/lesson/delete/note/:courseId/:lessonId/:noteId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteNote.delete);


  }


}

export const courseRoutes: CourseRoutes = new CourseRoutes();
