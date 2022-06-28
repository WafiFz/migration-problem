import { NextFunction, Request, response, Response } from 'express';
import { Book } from '@interfaces/books.interface';
import bookService from '@services/books.service';
import { request } from 'http'


class BooksController {
  public bookService = new bookService();
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      // res.sendStatus(200);
      // res.send("Wafi fahruzzaman");
    } catch (error) {
      next(error);
    }
  };

  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      
      const findAllBooksData = await this.bookService.findAllBook();
      res.status(200).json({ data: findAllBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
      const bookId = Number(req.params.id);
      const findBookById = await this.bookService.findBookById(bookId);
      res.status(200).json({data : findBookById, message: 'findBookById'});
    } catch (error){
      next(error);
    }
  };

  public deleteBookById = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {

      const response = await this.bookService.deleteBookById(parseInt(req.params.id))
      return res.json(response)
    } catch (error){
      next(error);
    }
  }

  public createBook = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {
      const response = await this.bookService.createBook(req.body);
      return res.json(response)
    } catch (error){
      next(error);
    }
  }

  public updateBook = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {

      const response = await this.bookService.updateBook(req.body);
      return res.json(response)
    } catch (error){
      next(error);
    }
  }
}

export default BooksController;
