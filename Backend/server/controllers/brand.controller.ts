import { Request, Response, NextFunction, Router, request } from 'express'
import { cp } from 'fs/promises'
import { Brand} from '../entities/brand'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Brand Controller.
 */
 export interface IBrandController extends ICrudController, IController {
    test: string
  }
  
  export class BrandController extends CrudController<Brand> implements IBrandController
  {
    public router = Router()
    public test = 'OK'
  
    constructor() {
      super(Brand) // Initialize the parent constructor
      this.router.get('/all', this.all)
      this.router.get('/:id', this.one)
      //this.router.get('/productsFromCategory/:brandId/:categoryId',this.getProductsFromCategoryAndBrand)
    }

    all = async (request: Request, response: Response, next: NextFunction) => {
      try {
        const data = await this.repository
          .createQueryBuilder('b')
          .select(['b.BrandId', 'b.Name'])
          .getMany()
        if (data.length === 0) {
          response.status(400).json({ error: 'Data is undefined' })
        } else {
          response.send(data)
        }
      } catch (error) {
        response.status(500).json({ error: { error } })
      }
    }

    getOne = async (request: Request, response: Response, next: NextFunction) => {
      try{
        if(request.params.id == undefined) 
          return response.status(500).json({error :  "Missing parameter" })
        
        const data = await this.repository
        .createQueryBuilder('b')
        .select([])
        .where('b.BrandId = :id', { id: request.params.id })
        .getOne()

        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }
}
 
  