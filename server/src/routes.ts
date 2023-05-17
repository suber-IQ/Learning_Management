import { Application } from 'express';

// import { healthRoutes } from '@user/userRoutes/healthRoutes';
import { userRoutes } from '@user/userRoutes/userRoutes';

const BASE_PATH = '/api/v1';

export default (app: Application) => {
  const routes = () => {
    // app.use('', healthRoutes.health());
    // app.use('', healthRoutes.env());
    // app.use('', healthRoutes.instance());
    // app.use('', healthRoutes.fiboRoutes());

    app.use(BASE_PATH, userRoutes.routes());


  };
  routes();
};
