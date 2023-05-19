import { Lesson } from '@course/courseInterface/courseInterface';
import { Schema } from 'mongoose';

const AssignmentSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter the assignment title'],
  },
  description: {
    type: String,
    required: [true, 'Please enter the assignment description'],
  },
  deadline: Date,
  submissions: [
    {
        student: String,
        submissionDate: Date,
        file: String, // file path or attachment reference
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
