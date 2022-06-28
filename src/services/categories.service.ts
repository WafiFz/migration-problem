import { Category } from '@interfaces/categories.interface';
import { HttpException } from '@exceptions/HttpException';
// import bookModel from '@models/books.model';
// import { CreateBookDto } from '@dtos/books.dto';
import { isEmpty } from '@utils/util';
import { Categories } from '@/entity/Categories';
import { Database } from '@/database';
import { DeleteResult } from 'typeorm';


class CategoriesService {
    
    
    public async findAllCategories(): Promise<Category[]> {
        return await Categories.find();
    }

    public async findCategoryById(categoryId: number): Promise<Category> {
        const findCategory = await Database.manager.findOneBy(Categories, {
            id: categoryId
        });

        if(!findCategory) throw new HttpException(409, "Category Tidak ada");
        return findCategory;
    }

    public async deleteCategoryById(categoryId: number): Promise<DeleteResult> {
        return await Categories.delete(categoryId); 
    }

    public async createCategory(categoryData: Category) {
        if (isEmpty(categoryData)) throw new HttpException(400, "Format salah");
    
        const createCategoryData = Categories.create({  
            name : categoryData.name
        });
   
        return createCategoryData.save();
    }

    public async updateCategory(categoryData: Category) {
        if (isEmpty(categoryData)) throw new HttpException(400, "Format salah");
        categoryData;
    
        const updateCategoryData = Categories.create({
            id : categoryData.id, 
            name : categoryData.name
        });
   
        return updateCategoryData.save();
    }
}

export default CategoriesService;