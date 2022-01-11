import { Guid } from "guid-typescript";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Product } from "./product";

@Entity('review') // The table name
export class Review {
    @PrimaryColumn('uuid')
    ReviewId?: string

    @Column({ nullable: true })
    Rating?: number
  
    @Column('text')
    Review?: string
    
    @ManyToOne(() => Product)
    @JoinColumn( {name: "ProductId"})
    Product?: Product
}