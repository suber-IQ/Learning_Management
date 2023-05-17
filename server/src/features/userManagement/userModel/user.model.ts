import { Schema, model } from 'mongoose';
import { IUser, UserRole } from '../userInterface/user.interface';

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
      type: String,
    },
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

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
