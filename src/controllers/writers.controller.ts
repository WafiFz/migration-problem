import { NextFunction, Request, response, Response } from 'express';
import { Writer } from '@interfaces/writers.interface';
import writerService from '@services/writers.service';
import { request } from 'http'


class WritersController {
  public writerService = new writerService();
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
     
    } catch (error) {
      next(error);
    }
  };

  public getWriters = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllWritersData = await this.writerService.findAllWriter();

      res.status(200).json({ data: findAllWritersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getWriterByEmail = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
      const writerEmail = String(req.params.email);
      console.log(writerEmail);
      const findWriterByEmail: Writer = await this.writerService.findWriterByEmail(writerEmail);
      res.status(200).json({data : findWriterByEmail, message: 'findEmailByEmail'});
    } catch (error){
      next(error);
    }
  };

  public deleteWriterByEmail = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {

      const response = await this.writerService.deleteWriterByEmail(req.params.email)
      return res.json(response)
    } catch (error){
      next(error);
    }
  }

  public createWriter = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {
      const response = await this.writerService.createWriter(req.body);
      return res.json(response)
    } catch (error){
      next(error);
    }
  }

  public updateWriter = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {
      const response = await this.writerService.updateWriter(req.body);
      return res.json(response)
    } catch (error){
      next(error);
    }
  }
}

export default WritersController;
