import { Guid } from "guid-typescript";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Product } from "./product";

@Entity('brand') // The table name
export class Brand {
    @PrimaryColumn({unique: true})
    BrandId?: string

    @Column({length: 30})
    Name?: string;

    @Column('text',{nullable: true})
    Picture?: string;
    
    @OneToMany(() => Product, product => product.Category)
    Product?: Product[];
}