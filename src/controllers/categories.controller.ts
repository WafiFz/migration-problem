import { NextFunction, Request, response, Response } from 'express';
import categoryService from '@services/categories.service';
import { request } from 'http'
import { Category } from '@/interfaces/categories.interface';


class CategoriesController {
  private categoryService = new categoryService();
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
     
    } catch (error) {
      next(error);
    }
  };

  public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCategoriesData = await this.categoryService.findAllCategories();

      res.status(200).json({ data:findAllCategoriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCategoryById = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
      const categoryId = parseInt(req.params.id);
      const findCategoryById: Category = await this.categoryService.findCategoryById(categoryId);
      res.status(200).json({data : findCategoryById, message: 'findCategoryById'});
    } catch (error){
      next(error);
    }
  };

  public deleteCategoryById = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {
      const response = await this.categoryService.deleteCategoryById(parseInt(req.params.id))
      return res.json(response)
    } catch (error){
      next(error);
    }
  }

  public createCategory = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {
      const response = await this.categoryService.createCategory(req.body);
      return res.json(response)
    } catch (error){
      next(error);
    }
  }

  public updateCategory = async (req: Request, res: Response, next: NextFunction) : Promise<Response<any, Record<string, any>>> => {
    try {
      const response = await this.categoryService.updateCategory(req.body);
      return res.json(response)
    } catch (error){
      next(error);
    }
  }
}

export default CategoriesController;
