import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { Users } from '../entity/Users';
import { isEmpty } from '@utils/util';
import UserService from './users.service';
import { Database } from '@/database';

class AuthService {
  public users = Users;
  public userService = new UserService();
  public async signup(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await Database.manager.findOneBy(this.users, {
      email: userData.email
    });

    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
     const createUserData = this.users.create({ 
        email : userData.email, 
        name : userData.name,
        password : hashedPassword
    });

    return createUserData.save();
  }

  public async login(userData: CreateUserDto) : Promise<{cookie: string; findUser: User; tokenData: TokenData; }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await Database.manager.findOneBy(this.users, {
      email: userData.email
    });

    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    
    const cookie = this.createCookie(tokenData);




    return { cookie, findUser, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "TIdak sedang login");

    const findUser: User = await Database.manager.findOneBy(this.users, {
      email: userData.email,
      password: userData.password
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
