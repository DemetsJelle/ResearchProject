import { Request, Response, NextFunction, Router, request, response } from 'express';
import { User } from "../entities/user"; 
import { CrudController, IController, ICrudController } from './crud.controller';
import admin, { auth } from 'firebase-admin';

/**
 * The interface to use for every User Controller.
 */
 export interface IUserController extends ICrudController, IController  {
     test: string;
}

export class UserController extends CrudController<User> implements IUserController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(User); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.post('/createUser', this.createUser);
    }

    createUser = async (request: Request, response: Response, next: NextFunction) => {
        try{
         let result:any
   
         if(request.body.data === null){
           response.status(400).json({error:"No data has been provided"})
         }else{
           if(request.body.data.id === undefined){
             response.status(400).json({error:"UserID is missing"})
           }else if(request.body.data.firstname === undefined){
             response.status(400).json({error:"FirstName is missing"})
           }else if(request.body.data.lastname === undefined){
             response.status(400).json({error:"LastName is missing"})
           }else if(request.body.data.email === undefined){
             response.status(400).json({error:"Email is missing"})
           }else{
             const newUser:User ={
               UserId : request.body.data.id,
               Firstname: request.body.data.firstname,
               Lastname: request.body.data.lastname,
               Email: request.body.data.email,
               wishlist: null,
             } 
             //Check if user exists
             const checkUser = await this.repository.findOne({UserId:request.body.data.id})
             if(checkUser === undefined) {
               const newDbUser = await this.repository.create(newUser);
               result = await this.repository.save(newDbUser); 
   
               if(result.UserId) return response.status(200).json({succes: true})
               else return response.status(500).json({error: "Something went wrong"})
             }
             else{
               return response.status(200).json({info: "User already exists"})
             }
           }
         }
        }catch(error) {
         response.status(500).json({error:error})
        }
       }
}