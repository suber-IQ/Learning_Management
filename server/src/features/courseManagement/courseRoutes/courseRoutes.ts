import express, { Router } from 'express';
import { CreateCourse } from '@course/courseControllers/admin/course.create.controller';
import AuthMiddleware from '@middleware/auth.middleware';

import { UserRole } from '@user/userInterface/user.interface';
import { AddLesson } from '@course/courseControllers/admin/course.addLesson.controller';
import { DeleteCourse } from '@course/courseControllers/admin/course.deleteCourse.controller';
import { DeleteLesson } from '@course/courseControllers/admin/course.deleteLesson.controller';


class CourseRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.adminRoutes();
    return this.router;
  }



  private adminRoutes(): void {
    // Admin
    this.router.post('/course/create',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Admin), CreateCourse.create);
    this.router.post('/course/lesson/:id',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Admin), AddLesson.create);
    this.router.delete('/course/:id',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Admin), DeleteCourse.delete);
    this.router.delete('/course/lesson/:courseId/:lessonId',AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Admin), DeleteLesson.delete);

  }


}

export const courseRoutes: CourseRoutes = new CourseRoutes();
