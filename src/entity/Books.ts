import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Categories } from "./Categories";
import { Writers } from "./Writers"
@Entity(
    "books"
)

export class Books extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    title: string

    @Column({nullable:true})
    publisher: string
    
    @Column({type:"numeric", nullable:true})
    price: number

    @ManyToOne(() => Writers, (writer) => writer.email)
    @JoinColumn({"name" : "email_writer"})
    email_writer: Writers

    @ManyToMany(() => Categories)
    @JoinTable({"name" : "books_categories"})
    categories: Categories[]
}