import { Request, Response, NextFunction, Router, request } from 'express'
import { Product} from '../entities/product'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Product Controller.
 */
 export interface IProductController extends ICrudController, IController {
    test: string
  }
  
  export class ProductController extends CrudController<Product> implements IProductController
  {
    public router = Router()
    public test = 'OK'
  
    constructor() {
      super(Product) // Initialize the parent constructor
      this.router.get('/all', this.all)
      this.router.get('/:id', this.one)
    }
}