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
      this.router.post('/', this.createWishlist)
    }

    createWishlist = async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result:any
        if (request.body.data === null) 
          response.status(406).json({error: 'No data has been provided'})
        
        const newWishlist:Wishlist = {
          //WishlistId: "35a6e9b7-6714-4147-82bf-679552ec0dc1",
          UserId: request.body.data.userId,
          ProductId: null,
          User: request.body.data.userId,
          Product: null
        }
        console.log(newWishlist)

        const addWishlist = await this.repository.create(newWishlist)
        result = await this.repository.save(addWishlist)

        if(result.WishlistId) 
          return response.status(200).json({succes: true})

        else 
          return response.status(500).json({error: "Something went wrong"})
        
      } catch (error) {
        response.status(500).json({error:{error}})
      }
    }
}