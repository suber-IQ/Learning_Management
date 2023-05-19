import AuthMiddleware from '@middleware/auth.middleware';
import { ActivityUser } from '@user/userControllers/profile/user.activity.controller';
import { DeleteMeProfile } from '@user/userControllers/profile/user.deleteMyProfile.controller';
import { ForgotPassword } from '@user/userControllers/profile/user.forgotPassword.controller';
import { GetUserActivity } from '@user/userControllers/admin/user.getActivityByAdmin.controller';
import { GetAllUser } from '@user/userControllers/admin/user.getAllUserByAdmin.controller';
import { GetUserDetails } from '@user/userControllers/profile/user.getDetails.controller';
import { Login } from '@user/userControllers/auth/user.login.controller';
import { Logout } from '@user/userControllers/auth/user.logout.controller';
import { Register } from '@user/userControllers/auth/user.register.controller';
import { ResetPassword } from '@user/userControllers/profile/user.resetPassword.controller';
import { UpdateUserPassword } from '@user/userControllers/profile/user.updatePassword.controller';
import { UpdateUserProfile } from '@user/userControllers/profile/user.updateProfile.controller';
import express, { Router } from 'express';
import { UserRole } from '@user/userInterface/user.interface';
import { UpdateUserRole } from '@user/userControllers/admin/user.updateRoleByAdmin.controller';
import { DeleteUser } from '@user/userControllers/admin/user.deleteUserByAdmin.controller';


class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/user/register',Register.create);
    this.router.post('/user/login',Login.read);
    this.router.put('/user/password/forgot',ForgotPassword.update);
    this.router.put('/user/password/reset/:token',ResetPassword.update);
    this.somePrivateRoutes();
    this.adminRoutes();
    return this.router;
  }

  private somePrivateRoutes(): void {
    this.router.get('/user/me',AuthMiddleware.isAuthenticateUser,GetUserDetails.read);
    this.router.delete('/user/me',AuthMiddleware.isAuthenticateUser,DeleteMeProfile.delete);
    this.router.put('/user/password/update',AuthMiddleware.isAuthenticateUser,UpdateUserPassword.update);
    this.router.put('/user/profile/update',AuthMiddleware.isAuthenticateUser,UpdateUserProfile.update);

    // put user Activity
    this.router.put('/user/activity',AuthMiddleware.isAuthenticateUser,ActivityUser.create);

  }

  private adminRoutes(): void {
    // get user Activity
    this.router.get('/admin/user/activity',AuthMiddleware.isAuthenticateUser, AuthMiddleware.authorizeRoles(UserRole.Admin),GetUserActivity.read);
    this.router.get('/admin/users',AuthMiddleware.isAuthenticateUser, AuthMiddleware.authorizeRoles(UserRole.Admin),GetAllUser.read);
    this.router.route('/admin/user/:id').all(AuthMiddleware.isAuthenticateUser,AuthMiddleware.authorizeRoles(UserRole.Admin)).put(UpdateUserRole.update).delete(DeleteUser.read);

  }

  public signoutRoute(): Router {
     this.router.get('/user/logout',Logout.update);
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
