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
      this.router.get('/all', this.getAll)
      this.router.get('/:id', this.one)
      this.router.get('/productsFromCategoryAndBrand/:brandId/:categoryId', this.getProductsFromCategoryAndBrand)
      this.router.get('/productsFromCategory/:categoryId', this.getProductsFromCategory)
      this.router.get('/productsFromBrand/:brandId', this.getProductsFromBrand)
      this.router.get('/reviews/:id', this.getReviews)
      this.router.get('/all/genders', this.getGenders)
    }

    getAll = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const data = await this.repository
        .createQueryBuilder('p')
        .select(['p.ProductId', 'p.Name','p.Afkorting','p.Picture','p.Price','p.Gender','b.Name','b.BrandId','c.Name','c.CategoryId'])
        .innerJoin('p.Brand','b')
        .innerJoin('p.Category','c')
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
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

    getProductsFromCategory = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const categoryId = request.params.categoryId
        
        if(categoryId === undefined) 
          return response.status(500).json({error :  "Missing parameter" })
        
        const data = await this.repository
        .createQueryBuilder('p')
        .select(['p.Name','p.Picture','p.Price','c.CategoryId','c.Name','b.BrandId','b.Name'])
        .innerJoin('p.Category','c')
        .innerJoin('p.Brand','b')
        .where('c.CategoryId = :id', { id: categoryId})
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }

    getProductsFromBrand = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const brandId = request.params.brandId
        
        if(brandId === undefined) 
          return response.status(500).json({error :  "Missing parameter" })

        const data = await this.repository
        .createQueryBuilder('p')
        .select(['p.Name','p.Picture','p.Price','b.Name','b.BrandId','b.Name','c.CategoryId','c.Name'])
        .innerJoin('p.Brand','b')
        .innerJoin('p.Category','c')
        .where('b.BrandId = :id', { id: brandId })
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }

    getReviews = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const productId = request.params.id
        console.log(productId)
        if(productId === undefined) 
          return response.status(500).json({error :  "Missing parameter" })

        const data = await this.repository
        .createQueryBuilder('p')
        .select(['r.Rating','r.Review','p.Name','p.ProductId'])
        .innerJoin('p.Review','r')
        .where('p.ProductId = :id', { id: productId })
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }

    getGenders = async (request: Request, response: Response, next: NextFunction) => {
      try{
        const data = await this.repository
        .createQueryBuilder('p')
        .select(['p.Gender'])
        .groupBy('p.Gender')
        .getMany()
        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }
}