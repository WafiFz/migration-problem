import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity(
    "categories"
)

export class Categories extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    name: string
}