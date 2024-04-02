import { driverService } from '../services/driverService';
import { vehicleService } from '../services/vehicleService';
import bcrypt from 'bcryptjs';
import { Request, Response , NextFunction} from "express";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, vehicleDetails, role } =
      req.body;
    const userExist = await driverService.findDriver({ phoneNumber });
    if (userExist) {
      throw new Error("User Already exist with same phoneNumber");
    }
    if (role !== "driver" && role == "") {
      return res.status(400).json({
        success: false,
        message: "check your role",
      });
    }
    const response = await driverService.registerUser({
      name,
      email: email.toLowerCase(),
      phoneNumber,
      vehicleDetails,
      role,
    });
    await response.save();
    return res.status(200).json({
      success: true,
      data: response,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in signUp " + error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(500).json({
        success: false,
        message: "Please enter proper info! ",
      });
    }
    const registeredUser = await driverService.findDriver({ phoneNumber });
    if (!registeredUser) {
      return res.json({
        success: false,
        message: "Please Register First",
      });
    } else {
      return res.json({
        success: true,
        message: "User is successfully logged in",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login " + error,
    });
  }
};

export const updateDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, availability, vehicleDetails } = req.body;
    const response = await driverService.updateDriver(
      id,
      { name, phoneNumber, availability, vehicleDetails }
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "driver details updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot find ID to update : " + error,
    });
  }
};

export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await driverService.deleteDriver(id);
    return res.status(200).json({
      success: true,
      data: response,
      message: "Driver deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting driver " + error,
    });
  }
};

export const availableDrivers = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const availableDrivers = await driverService.availableDrivers();
    res.status(200).json({
      success: true,
      drivers: availableDrivers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch available drivers",
    });
  }
};

export const addVehicle = async (req: Request, res: Response) => {
  try {
    const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId } = req.body;
    const vehicleExist = await vehicleService.findVehicle({ licensePlate });
    if (vehicleExist) {
      throw new Error("vehicle Already exist with same licensePlate");
    }
    const response = await vehicleService.addVehicle({
      manufacturer, model, year, licensePlate, color, vehicleClass, driverId,
      fare: 0,
      save: function (): unknown {
        throw new Error('Function not implemented.');
      }
    });
    await response.save();
    return res.status(200).json({
      success: true,
      data: response,
      message: "vehicle added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while addind vehicle " + error,
    });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { manufacturer, model, year, licensePlate, color, vehicleClass } =
      req.body;
    const response = await vehicleService.updateVehicleDetails(
      id,
      { manufacturer, model, year, licensePlate, color, vehicleClass }
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "vehicle details updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot find ID to update vehicle data : " + error,
    });
  }
};
