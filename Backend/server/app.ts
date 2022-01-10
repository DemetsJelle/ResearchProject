// app.ts
import 'reflect-metadata'
import express, { Request, Response, Router } from 'express'
import { createDatabase } from 'typeorm-extension'
import { Connection, ConnectionOptions, createConnection, getConnectionOptions, } from 'typeorm'

import { IController } from './controllers/crud.controller'

import { BrandController, IBrandController } from './controllers/brand.controller'
import { CategoryController, ICategoryController } from './controllers/category.controller'
import { ProductController, IProductController } from './controllers/product.controller'
import { ReviewController, IReviewController } from './controllers/review.controller'
import { WishlistController, IWishlistController } from './controllers/wishlist.controller'
import { UserController, IUserController } from './controllers/user.controller'
import seedDatabase from './seeders/seeder'

import admin from 'firebase-admin'
import dotenv from 'dotenv'
//import authMiddleware from './auth/firebaseAuthMiddleware'
import cors from 'cors'

//dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// })

// APP SETUP
const app = express(),
  port = process.env.PORT || 3001

// MIDDLEWARE
app.use(express.json()) // for parsing application/json
//app.use(authMiddleware);
app.use(cors())
;(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions()

  // Create the database before we make the connection. This will also add the tables
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database has been created!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      // ROUTES
      app.get('/', (request: Request, response: Response) => {
        response.send('Welcome, just know: you matter!')
      })

      interface AppControllers {
        brand: IBrandController
        category: ICategoryController
        product: IProductController
        review: IReviewController
        user: IUserController
        wishlist: IWishlistController
      }

      const controllers: AppControllers = {
        brand: new BrandController(),
        category: new CategoryController(),
        product: new ProductController(),
        review: new ReviewController(),
        user: new UserController(),
        wishlist: new WishlistController(),
      }

      Object.entries(controllers).forEach((entry: any) => {
        const key = entry[0] as string,
          controller = entry[1] as IController
        app.use(`/api/v1/${key}`, controller.router)
      })

      // APP START
      app.listen(port, () => {
        console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
      })
    })
    .catch(error => console.error(error))
})()