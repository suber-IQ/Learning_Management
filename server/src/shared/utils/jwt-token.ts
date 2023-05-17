import { config } from '@root/config';
import { IUser } from '@user/userInterface/user.interface';
import { Response } from 'express';

const sendToken = (user: IUser,statusCode: number, res: Response)=> {
    const token = user.getJWTToken();

    // options for cookie

    const options = {
        expires: new Date(
            Date.now() + Number(config.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        // httpOnly:
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
};

export default sendToken;
