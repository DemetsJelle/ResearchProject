import { plainToClass } from "class-transformer";
import { Connection, getRepository } from "typeorm";
import { Brand } from "../entities/brand";
import { Review } from "../entities/review";
import { Wishlist } from "../entities/wishlist";
import { Category } from "../entities/category";
import { Product } from "../entities/product";
import { User } from "../entities/user";
import { Config } from "../entities/config";

import brands from "./brand.json"
import categories from "./category.json"
import reviews from "./review.json";
import products from "./product.json";
import users from "./Users.json";
import wishlists from "./wishlist.json";


const seedDatabase = async (connection: Connection) => {

    const dbIsSeeded = await getRepository(Config).findOne('seeded');
    if (dbIsSeeded === undefined) {
        await connection.manager.save(plainToClass(Brand, brands));
        await connection.manager.save(plainToClass(Category, categories));
        await connection.manager.save(plainToClass(Product, products));
        await connection.manager.save(plainToClass(Review, reviews));
        await connection.manager.save(plainToClass(Wishlist, wishlists));
        await connection.manager.save(plainToClass(User, users));
        
        // Mark as seeded.
        const seeded = new Config();
        seeded.key = 'seeded';
        seeded.value = 'true';
        await connection.manager.save(seeded);
    
        console.log('I have seeded the database with everything necessary!');
    } else {
        console.log('The database has already been seeded before.');
    }

}  
export default seedDatabase;