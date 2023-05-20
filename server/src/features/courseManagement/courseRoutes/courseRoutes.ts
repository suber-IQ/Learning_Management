import express, { Router } from 'express';
import { CreateCourse } from '@course/courseControllers/teacher/course/course.create.controller';
import AuthMiddleware from '@middleware/auth.middleware';

import { UserRole } from '@user/userInterface/user.interface';
import { AddLesson } from '@course/courseControllers/teacher/course/course.addLesson.controller';
import { DeleteCourse } from '@course/courseControllers/teacher/course/course.deleteCourse.controller';
import { DeleteLesson } from '@course/courseControllers/teacher/course/course.deleteLesson.controller';
import { SubmitAssignment } from '@course/courseControllers/student/student.submit.submission.controller';
import { CreateAssignment } from '@course/courseControllers/teacher/document/course.createAssignment.controller';


class CourseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.teacherRoutes();
    this.Student();
    return this.router;
  }

 private Student(): void {
  this.router.put('/course/assignment/submit/:courseId/:assignmentId',AuthMiddleware.isAuthenticateUser, SubmitAssignment.update);
 }

  private teacherRoutes(): void {
    // Admin
    this.router.post('/course/create',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateCourse.create);
    this.router.post('/course/lesson/:id',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), AddLesson.create);
    this.router.delete('/course/:id',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteCourse.delete);
    this.router.delete('/course/lesson/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), DeleteLesson.delete);
    this.router.delete('/course/create/assignment/:courseId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Teacher), CreateAssignment.create);


  }


}

export const courseRoutes: CourseRoutes = new CourseRoutes();
