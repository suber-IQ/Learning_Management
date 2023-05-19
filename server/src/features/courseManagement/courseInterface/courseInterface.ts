import { UserRole } from './../../userManagement/userInterface/user.interface';
import { Document } from 'mongoose';


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

interface Subscription {
    id: string;
    status: string;
}

interface Assignment {
    title: string;
    description: string;
    deadline: Date;
    submissions: AssignmentSubmission[]

}

interface Note {
    title: string;
    content: string;
}

interface Code {
    title: string;
    language: string;
    code: string;
}

interface Quiz {
    title: string;
    questions: Question[]
}
interface Question {
    text: string;
    options: string[];
    correctOption: number;
}

interface AssignmentSubmission{
    student: string;
    submissionDate: Date;
    file: string; // file path or attachment reference
    comments: string;
    grade: number;
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
    createdBy: string;
    createdAt: Date;
    assignments: Assignment[];
    notes: Note[];
    codes: Code[];
    quizzes: Quiz[];
    slides: Slide[];
    coupon?: Coupon; // Optional coupon property
}
