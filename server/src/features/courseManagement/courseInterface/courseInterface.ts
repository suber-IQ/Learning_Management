import {  IUser, UserRole } from './../../userManagement/userInterface/user.interface';
import { Document, Types } from 'mongoose';


export enum CourseLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
};



export interface Lesson{
    _id: string;
    title: string;
    description: string;
    duration: number;
    content: {
        public_id: string;
        url: string;
    };
}

export interface Subscription {
    id: string;
    status: string;
}

export interface Assignment {
    _id: string;
    title: string;
    description: string;
    deadline: Date;
    submissions?: AssignmentSubmission[]
    totalOfStudentSubmission?: number;

}

interface Note {
    title: string;
    content: string;
}

export interface Code {
    title: string;
    language: string;
    code: string;
}

export interface Quiz {
    title: string;
    questions: Question[]
}
interface Question {
    text: string;
    options: string[];
    correctOption: number;
}

export interface AssignmentSubmission{
    studentId: string;
    studentUsername: string;
    submissionDate: Date;
    file: {
      public_id: string;
      url: string;
    }; // file path or attachment reference
    comments?: string;
    grade?: number;
}

interface Slide {
    title: string;
    content: string;
}

interface Coupon {
  code: string;
  discount: number;
}

export interface ICourse extends Document {
    title: string;
    instructer: string;
    description: string;
    level: CourseLevel;
    price: number;
    role: UserRole;
    enrolledStudents: number;
    lessons: Lesson[];
    numberOflesson: number;
    subscription: Subscription;
    category: string;
    poster: {
        public_id: string;
        url: string;
    };
    createdBy: Types.ObjectId | IUser;
    createdAt: Date;
    assignments: Assignment[];
    notes: Note[];
    codes: Code[];
    quizzes: Quiz[];
    slides: Slide[];
    coupon?: Coupon; // Optional coupon property
}
