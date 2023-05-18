import {  Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '@root/shared/middleware/catchAsyncError';


export class Logout {
  public static update = catchAsyncHandler(async (req: Request, res: Response): Promise<void> => {
        res.cookie('token',null,{
          expires: new Date(Date.now()),
          httpOnly: true
        });

        res.status(HTTP_STATUS.OK).json({
          success: true,
          message: 'Logged Out'
        });
  });
}
