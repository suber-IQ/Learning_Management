import {  Schema,model } from 'mongoose';
import { Course, CourseLevel } from '../courseInterface/courseInterface';
import { UserRole } from '../../userManagement/userInterface/user.interface';
import { AssignmentSchema, CodeSchema, NoteSchema, QuizSchema, SlideSchema } from './other.Schema';




const courseSchema = new Schema<Course>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: Object.values(CourseLevel),
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.User
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  lessons: [
    {
      title: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    }
  ],
  numberOflesson: {
    type: Number,
    required: true
  },
   subscription: {
    id: String,
    status: String,
   },
   category: {
    type: String,
    required: true
   },
   poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true
    }
   },
   createdBy: {
     type: String,
     required: true
   },
   createdAt: {
    type: Date,
    default: Date.now
   },
   assignments: [AssignmentSchema],
   notes: [NoteSchema],
   codes: [CodeSchema],
   quizzes: [QuizSchema],
   slides: [SlideSchema],
})

const CourseModel = model<Course>('Course',courseSchema);

export default CourseModel;