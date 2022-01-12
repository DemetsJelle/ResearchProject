import { Guid } from "guid-typescript";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product";

@Entity('category') // The table name
export class Category {
    @PrimaryGeneratedColumn('uuid')
    CategoryId?: string

    @Column({length: 30})
    Name?: string;
    
    @OneToMany(() => Product, product => product.Category)
    Product?: Product[];
}