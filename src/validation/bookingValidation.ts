import { NextFunction,Request,Response } from 'express';
import { bookingJoiSchema,updateJoiSchema } from '../models/bookingModel';
import logger from '../utils/logger'
import {ValidationResult,Schema}from 'joi';

const schemas:Record<string,Schema> = {
  booking:bookingJoiSchema,
}
const validateData = (model:string,data:any):ValidationResult=>{
  const schema = schemas[model];
    if (!schema) {
        throw new Error("Model/Schema not found")
    }
    return schema.validate(data)
}

export const validateRequest = (req:Request, res:Response, next:NextFunction) => { 
  try {
    const {error} = validateData('booking',req.body)
  if (error) {
    return res.status(500).json({success:false,message:"joischema validation error"+error.details[0].message})
   } 
next()
} catch (error) {
    logger.error(error);
  }
};
