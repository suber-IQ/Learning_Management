import {  Response, NextFunction} from 'express';
import HTTP_STATUS from 'http-status-codes';
import Jwt from 'jsonwebtoken';
import catchAsyncHandler from '@middleware/catchAsyncError.middleware';
import { AuthRequest, IUser } from '@user/userInterface/user.interface';
import ErrorHandler from '@global/helpers/error-handler';
import { config } from '@root/config';
import UserModel from '@user/userModel/user.model';



class AuthMiddleware{
    public static isAuthenticateUser = catchAsyncHandler(async (req: AuthRequest,res: Response, next: NextFunction) => {
        const { token } = req.cookies;


        if(!token){
            return next(new ErrorHandler('Please Login to access this resource',HTTP_STATUS.UNAUTHORIZED));
        }
        if (!config.JWT_SECRET) {
          throw new Error('JWT secret key not found');
        }
        const decodeData = await Jwt.verify(token, config.JWT_SECRET) as Partial<{ id: string; }>;
        req.user = await UserModel.findById(decodeData.id) as IUser;


        next();
    });

    public static authorizeRoles(...roles: string[]) {
        return (
          req: AuthRequest,
          res: Response<unknown, Record<string, unknown>>,
          next: NextFunction
        ) => {
          const userRole = req.user?.role;

          if (!userRole || !roles.includes(userRole)) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
              status: 'failed',
              message: `Role: ${userRole} is not allowed to access this resource`,
            });
          }

          next();
        };
      }


}



export default AuthMiddleware;
