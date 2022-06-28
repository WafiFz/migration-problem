import { Book } from '@interfaces/books.interface';
import { HttpException } from '@exceptions/HttpException';
// import bookModel from '@models/books.model';
// import { CreateBookDto } from '@dtos/books.dto';
import { isEmpty } from '@utils/util';
import { Books } from '@/entity/Books';
import { Database } from '@/database';
import { DeleteResult } from 'typeorm';
import { Categories } from '@/entity/Categories';


class BookService {
    
    
    public async findAllBook(): Promise<Books[]> {
        // return await Books.find();
        return await Database.manager.getRepository(Books).createQueryBuilder("books")
    .leftJoinAndSelect("books.email_writer", "writer")
    .getMany()
    }

    public async findBookById(bookId: number): Promise<Books> {
        const findBook = await Database.manager.findOneBy(Books, {
            id: bookId
        });

        if(!findBook) throw new HttpException(409, "Buku Tidak ada");
        return findBook;
    }

    public async deleteBookById(bookId: number): Promise<DeleteResult> {
        return await Books.delete(bookId); 
    }

    public async createBook(bookData: Book) {
        if (isEmpty(bookData)) throw new HttpException(400, "Format salah");
        bookData;

        // let findCategories : any[] = []
        
        // console.log( bookData.categories)
        // bookData.categories.forEach(async element => {
        //     let findCategory : Categories = await Database.manager.findOneBy(Categories, {
        //         id: element
        //     });
        //     // console.log({data : findCategory});
           
        //     // findCategories = {...findCategory}
        //     findCategories.push("satu")
        // });

        // let test : any; 
        // bookData.categories.forEach(async element => {
        //     let findCategory = await Database.manager.findOneBy(Categories, {
        //         id: element
        //     });
        //     console.log(findCategory);
        // //    test = findCategory;

        //     // findCategories = {...findCategory}

        // });

        // console.log("test = ", test)
        // findCategories.push("satuLuar")
        // console.log(findCategories);
    
        const createBookData = Books.create({ 
            title : bookData.title, 
            publisher : bookData.publisher, 
            price : bookData.price,
            email_writer : bookData.email_writer,
            categories: bookData.categories
        });
   
        return createBookData.save();
    }

    public async updateBook(bookData: Book) {
        if (isEmpty(bookData)) throw new HttpException(400, "Format salah");
        bookData;
    
        const updateBookData = Books.create({ 
            id : bookData.id,
            title : bookData.title, 
            publisher : bookData.publisher, 
            price : bookData.price,
            email_writer : bookData.email_writer,
            categories: bookData.categories
        });
   
        return updateBookData.save();
    }
}

export default BookService;