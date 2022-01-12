import { Guid } from "guid-typescript";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product";
import { User } from "./user"

@Entity('wishlist') // The table name
export class Wishlist {
    @PrimaryGeneratedColumn('uuid')
    WishlistId?: string

    @Column({unique: true})
    UserId?: string

    @Column({unique: true, nullable: true})
    ProductId?: string

    @OneToOne(() => User, user => user.wishlist)
    User: User;

    @OneToMany(() => Product, product => product.Wishlist, {nullable: true})
    Product?: Product[]
}