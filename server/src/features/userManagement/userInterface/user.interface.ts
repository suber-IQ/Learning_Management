import { Request } from 'express';
import { Schema, Document } from 'mongoose';

export enum UserRole {
    User = 'user',
    Teacher = 'teacher',
    Admin = 'admin'
}

interface UserProfile {
    firstName?: string;
    lastName?: string;
    avatar?: Avatar;
    age?: number;
    // Add additional profile fields as per your requirements
}

interface CourseEnrollment{
    courseId: Schema.Types.ObjectId;
    enrollmentDate: Date;
    progress: number;
    completed: boolean;
    // Add additional enrollment fields as per your requirements
}

interface IUserActivity extends Document{
  userId: string;
  activityType: string;
  activityData: object;
  timestamp: Date;
     // Add additional activity fields as per your requirements
}


interface Avatar {
  public_id: string;
  url: string;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profile?: UserProfile;
    coursesEnrolled: CourseEnrollment[];
    activities: IUserActivity[];
    createdAt: Date;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    getJWTToken(): string;
    isModified(field: string): boolean;
    comparePassword(password: string) : Promise<boolean>
    getResetPasswordToken(): string;
    // Add additional fields as per your requirements
  }


  //Auth Request middleware use
  export interface AuthRequest extends Request {
    user?: IUser;
  }

