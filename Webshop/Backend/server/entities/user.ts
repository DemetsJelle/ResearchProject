import { Guid } from "guid-typescript";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Wishlist } from "./wishlist"

@Entity('user') // The table name
export class User {
    @PrimaryColumn({unique: true})
    UserId?: string

    @Column({length: 30})
    Firstname?: string;

    @Column({length: 50})
    Lastname?: string;
    
    @Column({length: 100})
    Email?: string;
    
    @OneToMany(() => Wishlist, wishlist => wishlist.Product)
    Wishlist?: Wishlist[]
}