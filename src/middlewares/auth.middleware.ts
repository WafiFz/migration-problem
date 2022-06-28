import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import {Users} from '../entity/Users';
import { Database } from '@/database';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {

  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    const userModel = Users

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser =  await Database.manager.findOneBy(userModel, { id: userId });

      if (findUser) {
        req.user = findUser;
        // res.send("autentikasi berhasil")
        console.log("autentikasi berhasil")
        next();
      } else {
        next(new HttpException(401, 'Token autentikasi salah'));
      }
    } else {
      next(new HttpException(404, 'Tidak ada token autentikasi'));
    }
  } catch (error) {
    next(new HttpException(401, 'Token autentikasi salah'));
  }
};

export default authMiddleware;
