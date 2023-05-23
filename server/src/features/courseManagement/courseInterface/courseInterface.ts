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
    assignments: Assignment[];
    notes: Note[];
    codes: Code[];
    quizzes: Quiz[];
    slides: Slide[];
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

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdDate: Date;
  modifiedDate?: Date;
  tags: string[];  // meeting , important
  attachments: Attachment[];
}

export interface Attachment {
  file_public_id: string;
  file_url: string;
}

export interface Code {
   _id: string;
    title: string;
    language: string;
    code: string;
}

export interface Quiz {
    title: string;
    questions: Question[],
    submissions?: QuizSubmission[]
    totalOfStudentSubmission?: number;
}
export interface Question {
    text: string;
    options: string[];
    explanation: string;
    answer: string;
}
export interface QuizSubmission{
  studentId: Types.ObjectId;
  studentUsername: string;
  submissionDate: Date
  correctQuestion: number;
  wrongQuestion: number;
  attempQuestion: number;
  comments?: string;
  grade?: number;
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
    _id: string;
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

    coupon?: Coupon; // Optional coupon property
}
