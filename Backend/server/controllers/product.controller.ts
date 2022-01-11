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
      this.router.get('/productsFromCategory/:brandId/:categoryId', this.getProductsFromCategoryAndBrand)
    }

    getProductsFromCategoryAndBrand = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const brandId = request.params.brandId
        const categoryId = request.params.categoryId
        
        if(brandId === undefined || categoryId === undefined) 
          return response.status(500).json({error :  "Missing parameter" })
        
        console.log(brandId, categoryId)
        const data = await this.repository
        .createQueryBuilder('p')
        .select(['p.Name','p.Picture','p.Price','b.Name','b.BrandId','c.CategoryId','c.Name'])
        .innerJoin('p.Brand','b')
        .innerJoin('p.Category','c')
        .where('b.BrandId = :id', { id: brandId })
        //.andWhere('c.CategoryId = :id', { id: categoryId})
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }
}