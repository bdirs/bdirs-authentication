import {Request} from "express";
import {IUser} from "./user-type";


export interface IRequest extends Request {
  user: IUser;
}
