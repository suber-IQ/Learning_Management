import { Assignment, Lesson } from '@course/courseInterface/courseInterface';
import { Schema } from 'mongoose';

const AssignmentSchema = new Schema<Assignment>({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  deadline: Date,
  totalOfStudentSubmission: {
    type: Number,
    default: 0
  },
  submissions: [
    {
       studentId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        studentUsername: String,
        submissionDate: Date,
        file: {
          public_id: String,
          url: String,
        }, // file path or attachment reference
        comments: String,
        grade: Number
    }
  ]
  // Add additional fields specific to assignments
});

const NoteSchema = new Schema({
  title: String,
  content: String
  // Add additional fields specific to notes
});

const CodeSchema = new Schema({
  title: String,
  code: String,
  language: String
  // Add additional fields specific to code snippets
});

const QuizSchema = new Schema({
  title: String,
  questions: [
    {
      text: String,
      options: [String],
      correctOption: Number,
    },
  ],
  // Add additional fields specific to quizzes
});

const SlideSchema = new Schema({
  title: String,
  content: String
  // Add additional fields specific to slides
});

const lessonSchema = new Schema<Lesson>({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  duration: Number,
  content: {
    public_id: String,
    url: String,
  },
});

export {
  lessonSchema,
  AssignmentSchema,
  NoteSchema,
  CodeSchema,
  QuizSchema,
  SlideSchema,
};
