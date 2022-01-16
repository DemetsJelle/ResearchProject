import { Guid } from "guid-typescript";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product";
import { User } from "./user"

@Entity('wishlist') // The table name
export class Wishlist {
    @PrimaryGeneratedColumn('uuid')
    WishlistId?: string

    @ManyToOne(() => User)
    @JoinColumn( {name: "UserId"})
    public User!: User;

    @ManyToOne(() => Product)
    @JoinColumn( {name: "ProductId"})
    public Product!: Product;
}