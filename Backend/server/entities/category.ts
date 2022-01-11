import { Guid } from "guid-typescript";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Product } from "./product";

@Entity('category') // The table name
export class Category {
    @PrimaryColumn('uuid')
    CategoryId?: string

    @Column({length: 30})
    Name?: string;
    
    @OneToMany(() => Product, product => product.Category)
    Product?: Product[];
}