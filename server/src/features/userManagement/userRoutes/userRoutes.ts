import AuthMiddleware from '@middleware/auth.middleware';
import { ForgotPassword } from '@user/userControllers/user.forgotPassword.controller';
import { GetUserDetails } from '@user/userControllers/user.getDetails.controller';
import { Login } from '@user/userControllers/user.login.controller';
import { Logout } from '@user/userControllers/user.logout.controller';
import { Register } from '@user/userControllers/user.register.controller';
import { ResetPassword } from '@user/userControllers/user.resetPassword.controller';
import { UpdateUserPassword } from '@user/userControllers/user.updatePassword.controller';
import { UpdateUserProfile } from '@user/userControllers/user.updateProfile.controller';
import express, { Router } from 'express';


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
    return this.router;
  }

  private somePrivateRoutes(): void {
    this.router.get('/user/me',AuthMiddleware.isAuthenticateUser,GetUserDetails.read);
    this.router.put('/user/password/update',AuthMiddleware.isAuthenticateUser,UpdateUserPassword.update);
    this.router.put('/user/profile/update',AuthMiddleware.isAuthenticateUser,UpdateUserProfile.update);
  }

  public signoutRoute(): Router {
     this.router.get('/user/logout',Logout.update);
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
