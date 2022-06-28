import { Router } from 'express';
import CategoriesController from '@controllers/categories.controller';
import { Routes } from '@interfaces/routes.interface';

class CategoriesRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categoriesController.getCategories);
    this.router.get(`${this.path}/:id`, this.categoriesController.getCategoryById);
    this.router.delete(`${this.path}/:id`, this.categoriesController.deleteCategoryById);
    this.router.post(`${this.path}/`, this.categoriesController.createCategory);
    this.router.put(`${this.path}/:id`, this.categoriesController.updateCategory);
  }
}

export default CategoriesRoute;
