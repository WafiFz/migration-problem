import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail} from "class-validator";

@Entity(
    "users"
)

export class Users extends BaseEntity {
    static findUserById(id: number): import("../interfaces/users.interface").User {
      throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsEmail()
    email: string

    @Column()
    name: string
    
    @Column()
    password: string
}