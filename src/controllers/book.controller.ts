import { NextFunction, Request, Response } from 'express';
import Book from '../models/book.model';

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, description, publishedYear, isbn } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const book = new Book({
      title,
      author,
      description,
      publishedYear,
      isbn,
      userId
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const books = await Book.find({ userId });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const book = await Book.findOne({ _id: id, userId });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const updates = req.body;

    const book = await Book.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const book = await Book.findOneAndDelete({ _id: id, userId });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
}; 