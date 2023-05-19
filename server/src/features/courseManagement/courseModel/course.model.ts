import {  Schema,model } from 'mongoose';
import { ICourse, CourseLevel } from '../courseInterface/courseInterface';
import { UserRole } from '../../userManagement/userInterface/user.interface';
import { AssignmentSchema, CodeSchema, NoteSchema, QuizSchema, SlideSchema, lessonSchema } from './other.model';




const courseSchema = new Schema<ICourse>({
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
  lessons: [lessonSchema],
  numberOflesson: {
    type: Number,
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
   coupon: {
    code: {
      type: String,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100
    }
   }
});

const CourseModel = model<ICourse>('Course',courseSchema);

export default CourseModel;
