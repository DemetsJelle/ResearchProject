import { Request, Response, NextFunction, Router, request } from 'express'
import { Review} from '../entities/review'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Review Controller.
 */
 export interface IReviewController extends ICrudController, IController {
    test: string
  }
  
  export class ReviewController extends CrudController<Review> implements IReviewController
  {
    public router = Router()
    public test = 'OK'
  
    constructor() {
      super(Review) // Initialize the parent constructor
      this.router.get('/all', this.getAll)
      this.router.get('/:id', this.one)
      this.router.post('/',this.createReview)
    }

    createReview = async (request: Request, response: Response, next: NextFunction) => {
      try {
        let result:any
        if (request.body.data === null) 
          response.status(406).json({error: 'No data has been provided'})
        
        const newReview:Review = {
          
          Rating: request.body.data.rating,
          Review: request.body.data.review,
          Product: request.body.data.product
        }
        console.log(newReview)

        const addReview = await this.repository.create(newReview)
        result = await this.repository.save(addReview)

        if(result.ReviewId) 
          return response.status(200).json({succes: true})

        else 
          return response.status(500).json({error: "Something went wrong"})
        
      } catch (error) {
        response.status(500).json({error:{error}})
      }
    }

    getAll = async (request: Request, response: Response, next: NextFunction) => {
      try{

        const data = await this.repository
        .createQueryBuilder('r')
        .select(['r.ReviewId','r.Rating','r.Review','p.Name','p.ProductId'])
        .innerJoin('r.Product','p')
        .getMany()

        response.send(data)
      } catch(error){
        response.status(500).json({error : { error }})
      }
    }
}