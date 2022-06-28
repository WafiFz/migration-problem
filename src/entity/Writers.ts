import { BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { IsEmail, IsDate } from "class-validator";
import { Books } from "./Books"

@Entity(
    "writer"
)

export class Writers extends BaseEntity {
    @PrimaryColumn()
    @IsEmail()
    email: string

    @Column({nullable:true})
    name: string
    
    @Column({nullable:true})
    @IsDate()
    birth: Date
    
    @OneToMany(() => Books, (book) => book.id)
    id_book: Books[]
}