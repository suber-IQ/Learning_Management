import { Application, json, urlencoded, Response, Request } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import multer from 'multer';
import hpp from 'hpp';
import { storage } from '@global/helpers/delete-upload-file';
import compression from 'compression';
import HTTP_STATUS from 'http-status-codes';
import Logger from 'bunyan';
import apiStats from 'swagger-stats';
import { config } from '@root/config';
import errorMiddleware from '@middleware/error.middleware';
import applicationRoutes from '@root/routes';


const upload = multer({
   storage,
   limits: {
    fileSize: 2 * 1024 * 1024,  // 2mb limit
   }
 });

const log: Logger = config.createLogger('server');

export class LearingManagement {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.apiMonitoring(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    // app.set('trust proxy', 1);
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
    app.use(cookieParser());
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use(upload.single('file')); // Use multer middleware for handling file uploads
  }

  private routesMiddleware(app: Application): void {
    applicationRoutes(app);
  }

  private apiMonitoring(app: Application): void {
    app.use(
      apiStats.getMiddleware({
        uriPath: '/api-monitoring'
      })
    );
  }

  private globalErrorHandler(app: Application): void {
    app.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    app.use(errorMiddleware);

  }

  private async startServer(app: Application): Promise<void> {

    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.error(error);
    }
  }


  private startHttpServer(httpServer: http.Server): void {
    log.info(`Worker with process id of ${process.pid} has started...`);
    log.info(`Server has started with process ${process.pid}`);
    httpServer.listen(config.PORT, () => {
      log.info(`Server running on port ${config.PORT}`);
    });
  }


}
