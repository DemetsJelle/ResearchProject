import { Guid } from "guid-typescript";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Product } from "./product";
import { User } from "./user"

@Entity('wishlist') // The table name
export class Wishlist {
    @PrimaryColumn({unique: true})
    WhislistId?: string

    @Column({unique: true})
    UserId?: string

    @Column({unique: true})
    ProductId?: string

    @OneToOne(() => User, user => user.wishlist)
    user: User;

    @OneToMany(() => Product, product => product.Wishlist)
    Product?: Product[]
}