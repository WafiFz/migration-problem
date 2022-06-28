import { Writer } from '@interfaces/writers.interface';
import { HttpException } from '@exceptions/HttpException';
// import bookModel from '@models/books.model';
// import { CreateBookDto } from '@dtos/books.dto';
import { isEmpty } from '@utils/util';
import { Writers } from '@/entity/Writers';
import { Database } from '@/database';
import { DeleteResult } from 'typeorm';


class WriterService {
    
    
    public async findAllWriter(): Promise<Writer[]> {
        return await Writers.find();
    }

    public async findWriterByEmail(writerEmail: string): Promise<Writer> {
        const findWriter = await Database.manager.findOneBy(Writers, {
            email: writerEmail
        });

        if(!findWriter) throw new HttpException(409, "Writer Tidak ada");
        return findWriter;
    }

    public async deleteWriterByEmail(writerEmail: string): Promise<DeleteResult> {
        return await Writers.delete(writerEmail); 
    }

    public async createWriter(writerData: Writer) {
        if (isEmpty(writerData)) throw new HttpException(400, "Format salah");
        writerData;
    
        const createWriterData = Writers.create({ 
            email : writerData.email, 
            name : writerData.name, 
            birth : writerData.birth
        });
   
        return createWriterData.save();
    }

    public async updateWriter(writerData: Writer) {
        if (isEmpty(writerData)) throw new HttpException(400, "Format salah");
        writerData;
    
        const updateWriterData = Writers.create({ 
            email : writerData.email, 
            name : writerData.name, 
            birth : writerData.birth
        });
   
        return updateWriterData.save();
    }
}

export default WriterService;