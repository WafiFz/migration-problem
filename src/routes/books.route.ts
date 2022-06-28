import { Router } from 'express';
import BooksController from '@controllers/books.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class BooksRoute implements Routes {
  public path = '/books';
  public router = Router();
  public booksController = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.booksController.getBooks);
    this.router.get(`${this.path}/:id`, this.booksController.getBookById);
    this.router.delete(`${this.path}/:id`, this.booksController.deleteBookById);
    this.router.post(`${this.path}/`, this.booksController.createBook);
    this.router.put(`${this.path}/:id`, this.booksController.updateBook);
  }
}

export default BooksRoute;
