import { hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { Users } from '../entity/Users';
import { isEmpty } from '@utils/util';
import { Database } from '@/database';
import { email } from 'envalid';
import { DeleteResult } from 'typeorm';



class UserService {
  public users = Users;

  public async findAllUser(): Promise<User[]> {
    // const users: User[] = this.users;
    return await this.users.find();
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await Database.manager.findOneBy(this.users, {
      id: userId
    });
    
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "Tidak ada input data user");

    const findUser: User = await Database.manager.findOneBy(this.users, {
      email: userData.email
  });
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    
    const createUserData = this.users.create({ 
        email : userData.email, 
        name : userData.name,
        password : hashedPassword
    });

    return createUserData.save();
  }

  public async updateUser(userId: number, userData:User): Promise<Users> {
    if (isEmpty(userData)) throw new HttpException(400, "Tidak ada input data user");

    const hashedPassword = await hash(userData.password, 10);

    const updateUser = this.users.create({ 
        id : userData.id,
        email : userData.email, 
        name : userData.name,
        password : hashedPassword
    });

    return updateUser.save();
  }

  public async deleteUser(userId: number):Promise<DeleteResult> {
    return await this.users.delete(userId);
  }
}

export default UserService;
