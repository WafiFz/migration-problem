import { Router } from 'express';
import WritersController from '@controllers/writers.controller';
import { Routes } from '@interfaces/routes.interface';

class WritersRoute implements Routes {
  public path = '/writers';
  public router = Router();
  public writersController = new WritersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.writersController.getWriters);
    this.router.get(`${this.path}/:email`, this.writersController.getWriterByEmail);
    this.router.delete(`${this.path}/:email`, this.writersController.deleteWriterByEmail);
    this.router.post(`${this.path}/`, this.writersController.createWriter);
    this.router.put(`${this.path}/:email`, this.writersController.updateWriter);
  }
}

export default WritersRoute;
