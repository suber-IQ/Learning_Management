import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import ErrorHandler from '@global/helpers/error-handler';
interface ErrorResponse {
  success: boolean;
  message: string;
}



export default function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

   // Joi validation error
   if (err instanceof ValidationError) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = err.details.map((detail: any) => detail.message).join(', ');
    err = new ErrorHandler(message, 400);
  }
  // Wrong Mongodb Id error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message,400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,400);
  }

  // Wrong JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Json Web Token is invalid, Try again ';
    err = new ErrorHandler(message,400);

  }

  // JWT EXPIRE error
  if (err.name === 'TokenExpiredError') {
    const message = 'Json Web Token is Expired, Try again ';
    err = new ErrorHandler(message,400);

  }

  const response: ErrorResponse = {
    success: false,
    message: err.message,
  };

  res.status(err.statusCode).json(response);
}
