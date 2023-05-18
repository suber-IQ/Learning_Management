import { ForgotPassword } from '@user/userControllers/user.forgotPassword.controller';
import { Login } from '@user/userControllers/user.login.controller';
import { Logout } from '@user/userControllers/user.logout.controller';
import { Register } from '@user/userControllers/user.register.controller';
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
    return this.router;
  }

  public signoutRoute(): Router {
     this.router.get('/user/logout',Logout.update);
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();
