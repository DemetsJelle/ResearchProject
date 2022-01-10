import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Brand } from "./brand"
import { Category } from "./category"
import { Review } from "./review"
import { Wishlist } from "./wishlist"

@Entity('product')
export class Product{
    @PrimaryGeneratedColumn('uuid')
    ProductId?: string

    @Column({unique: true})
    Name?: string

    @Column('double')
    Price?: number

    @Column('bool')
    InStock?: boolean

    @Column('text')
    Picture?: string

    @Column('text')
    Description?: string

    @Column('simple-json')
    ExtraInfo?: [{}]

    @Column('simple-array')
    Sizes?: string[]

    @Column('text',{nullable: true})
    Gender?:string

    @ManyToOne(() => Wishlist , {nullable: true})
    @JoinColumn( {name: "WishlistId"})
    Wishlist: Wishlist

    @ManyToOne(() => Brand)
    @JoinColumn( {name: "BrandId"})
    Brand: Brand

    @ManyToOne(() => Category)
    @JoinColumn( {name: "CategoryId"})
    Category: Category

    @OneToMany(() => Review, review => review.Product, {nullable: true})
    Review?: Review[]
}