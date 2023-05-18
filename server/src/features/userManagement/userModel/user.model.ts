import bcrypt  from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';
import { IUser, UserRole } from '../userInterface/user.interface';
import { config } from '@root/config';

export const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.User,
  },
  profile: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatar: {
      public_id: String,
      url: String
    },
    age: Number
  },
  coursesEnrolled: [
    {
      courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      enrollmentDate: {
        type: Date,
        default: Date.now,
      },
      progress: {
        type: Number,
        default: 0,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  activities: [
    {
      action: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});



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


const UserModel = model<IUser>('User', userSchema);

export default UserModel;
