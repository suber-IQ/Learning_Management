import { Register } from '@user/userControllers/user.register.controller';
import express, { Router } from 'express';

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/user/register',Register.create);
    return this.router;
  }

  // public signoutRoute(): Router {
  //   // this.router.get('/signout', )
  //   return this.router;
  // }
}

export const userRoutes: UserRoutes = new UserRoutes();
