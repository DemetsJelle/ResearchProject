import { Request, Response, NextFunction, Router, request } from 'express'
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
    }
}
 
  