import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  publishedYear: number;
  isbn: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const BookSchema: Schema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    publishedYear: {
      type: Number,
      required: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    userId: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
);

export default mongoose.model<IBook>('Book', BookSchema); 