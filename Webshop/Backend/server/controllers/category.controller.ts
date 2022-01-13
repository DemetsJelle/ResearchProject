import { Request, Response, NextFunction, Router, request } from 'express'
import { Category } from '../entities/category'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Category Controller.
 */
 export interface ICategoryController extends ICrudController, IController {
    test: string
  }
  
  export class CategoryController extends CrudController<Category> implements ICategoryController
  {
    public router = Router()
    public test = 'OK'
  
    constructor() {
      super(Category) // Initialize the parent constructor
      this.router.get('/all', this.all)
      this.router.get('/:id', this.one)
    }
}