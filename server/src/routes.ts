import { Application } from 'express';

// import { healthRoutes } from '@user/userRoutes/healthRoutes';
import { userRoutes } from '@user/userRoutes/userRoutes';
import { courseRoutes } from '@course/courseRoutes/courseRoutes';

const BASE_URL = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    // app.use('', healthRoutes.health());
    // app.use('', healthRoutes.env());
    // app.use('', healthRoutes.instance());
    // app.use('', healthRoutes.fiboRoutes());

    app.use(BASE_URL, userRoutes.routes());
    app.use(BASE_URL, userRoutes.signoutRoute());

    app.use(BASE_URL,courseRoutes.routes());
  };
  routes();
};
