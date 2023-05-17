import { IUser } from '@user/userInterface/user.interface';
import { userSchema } from './user.model';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '@root/config';

// Password hash
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// JWT TOKEN
userSchema.methods.getJWTToken = function (): string {

  if (!config.JWT_SECRET) {
    throw new Error('JWT secret key not found');
  }
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
     expiresIn: config.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
   return await bcrypt.compare(password,this.password);
};

// Generating Password Rest Token

userSchema.methods.getResetPasswordToken = function (): string {
  // Generating Token
  const resetToken: string = crypto.randomBytes(20).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
