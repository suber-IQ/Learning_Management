import { RequestHandler,Request,Response,NextFunction } from 'express';

const catchAsyncHandler = <T = unknown>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): RequestHandler => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default catchAsyncHandler;
