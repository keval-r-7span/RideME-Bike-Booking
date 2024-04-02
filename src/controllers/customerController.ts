import { Request, Response } from "express";
import { customerService } from "../services/userService";

const getCustomer = async (req: Request, res: Response) => {
  try {
    const response = await customerService.viewCustomer();
    if(!response){
      return res.status(404).json({
        success:false,
        message: "Unable to get list of Customers"
      })
    }
    else{
      return res.status(200).json({ 
        sucess: true, 
        data: response });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error in GetCustomer "+error,
    });
  }
};

const getCustomerByID = async (req: Request, res: Response) => {
  try {
    const response = await customerService.viewCustomerById(req.params.id);
    if(!response){
      return res.status(404).json({
        success: false,
        message: "Invalid ID"
      })
    }
    else{
      return res.status(200).json({
        sucess: true,
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error in GetCustomer ID "+error,
    });
  }
};

const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;
    const response = await customerService.updateCustomer(req.params.id, {
      name,
      email,
      role,
    });
    if(!response){
      return res.status(404).json({
        success: false,
        message: "Invalid ID"
      })
    }
    else{
      return res.status(200).json({
        sucess: true,
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "ERROR in Update Customer "+error,
    });
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const response = await customerService.deleteCustomer(req.params.id);
    if(!response){
      return res.status(400).json({
        success: false,
        message: "Invalid ID"
      })
    }
    return res.status(200).json({
      sucess: true,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "ERROR in DeleteCustomer "+error,
    });
  }
};

export { getCustomer, getCustomerByID, updateCustomer, deleteCustomer };
