import { Request, Response, NextFunction, Router, request } from 'express'
import { Wishlist} from '../entities/wishlist'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Wishlist Controller.
 */
 export interface IWishlistController extends ICrudController, IController {
    test: string
  }
  
  export class WishlistController extends CrudController<Wishlist> implements IWishlistController
  {
    public router = Router()
    public test = 'OK'
  
    constructor() {
      super(Wishlist) // Initialize the parent constructor
      this.router.get('/all', this.all)
      this.router.get('/:id', this.one)
    }
}