import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} from '../controllers/book.controller';

const router = Router();

router.use(authenticate);

router.post('/', createBook);
router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router; 