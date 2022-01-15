import { Request, Response, NextFunction, Router, request } from 'express'
import { Product } from '../entities/product'
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
      this.router.get('/userwishlist/:id', this.getWishlist)
      this.router.post('/', this.addToWishlist)
      
    }

    addToWishlist = async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result:any
        if(request.body ===undefined)
          return response.status(400).json({error: 'Parameters are missing'})

        const newWishlist:Wishlist = {
          User: request.body.userId,
          Product: request.body.productId
        }
        console.log(newWishlist)

        const addWishlist = await this.repository.create(newWishlist)
        result = await this.repository.save(addWishlist)

        if(result.WishlistId) {
          return response.status(200).json({succes: true})
        }

        else 
          return response.status(500).json({error: "Something went wrong"})
        
      } catch (error) {
        response.status(500).json({error:{error}})
      }
    }

    getWishlist = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const userId = request.params.id
        
        if(userId === undefined) 
          return response.status(500).json({error :  "Missing parameter" })
        
        console.log(userId)
        const data = await this.repository
        .createQueryBuilder('w')
        .select(['w.WishlistId','p.Name','p.Picture','p.Price','p.InStock'])
        .innerJoin('w.Product','p')
        .innerJoin('w.User','u')
        .where('w.User = :id', { id: userId })
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }
}