var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { driverService } from '../services/driverService';
const STATIC_PHONE_NUMBER = "9999999999";
const STATIC_OTP = "9999";
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phoneNumber, role, location } = req.body;
        // if (!name || !email || !phoneNumber || !role) {
        //   return res
        //     .status(200)
        //     .json({ success: false, message: "Enter valid details of driver." });
        // }
        const userExist = yield driverService.findCustomer({ phoneNumber });
        if (userExist) {
            return res
                .status(200)
                .json({ success: false, message: "User Already exist." });
        }
        if (role !== "admin") {
            const response = yield driverService.registerUser({
                name,
                email: email.toLowerCase(),
                phoneNumber,
                role
            });
            if (!response) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Data",
                });
            }
            return res.json({
                success: true,
                data: response,
                message: "OTP sent successfully"
            });
        }
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Error at signing up " + error
        });
    }
});
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    // Check if the provided phone number and OTP match the static values
    if (phoneNumber === STATIC_PHONE_NUMBER && otp === STATIC_OTP) {
        // Perform user registration or any other necessary actions here
        return res.status(200).json({
            success: true,
            message: "OTP successfully verified",
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number or OTP",
        });
    }
});
const sendLoginOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    // Check if the provided phone number matches the static value
    if (phoneNumber === STATIC_PHONE_NUMBER) {
        // Simulate OTP sent
        return res.status(200).json({
            success: true,
            message: "OTP successfully sent",
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number",
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        return res.json({
            success: false,
            message: "Enter Valid details",
        });
    }
    try {
        if (phoneNumber === STATIC_PHONE_NUMBER && otp === STATIC_OTP)
            return res.json({
                success: true,
                message: "successfully logged in",
            });
    }
    catch (error) {
        return res.json({
            success: false,
            message: error,
        });
    }
});
export { signUp, verifyOtp, sendLoginOtp, login };
// export const availableDrivers = async (req:Request, res: Response, next: NextFunction) => {
//   try {
//     const availableDrivers = await driverService.availableDrivers();
//     res.status(200).json({
//       success: true,
//       message: "Successfully Verified and Registered ",
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error
//     });
//   }
// };
// export const addVehicle = async (req: Request, res: Response) => {
//   try {
//     const { manufacturer, model, year, licensePlate, color, vehicleClass, driverId } = req.body;
//     const vehicleExist = await vehicleService.findVehicle({ licensePlate });
//     if (vehicleExist) {
//       throw new Error("vehicle Already exist with same licensePlate");
//     }
//     const response = await vehicleService.addVehicle({
//       manufacturer, model, year, licensePlate, color, vehicleClass, driverId,
//       fare: 0,
//       save: function (): unknown {
//         throw new Error('Function not implemented.');
//       }
//     });
//     await response.save();
//     return res.status(200).json({
//       success: true,
//       data: response,
//       message: "vehicle added successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while addind vehicle " + error,
//     });
//   }
// };
// export const updateVehicle = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { manufacturer, model, year, licensePlate, color, vehicleClass } =
//       req.body;
//     const response = await vehicleService.updateVehicleDetails(
//       id,
//       { manufacturer, model, year, licensePlate, color, vehicleClass }
//     );
//     return res.status(200).json({
//       success: true,
//       data: response,
//       message: "vehicle details updated Successfully",
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error,
//     });
//   }
// };
// export const getDriver = async (req: Request, res: Response) => {
//   try {
//     const response = await driverService.viewDriver();
//     return res.status(200).json({ 
//       sucess: true, 
//       data: response });
//   } catch (error) {
//     return res.json({
//       sucess: false,
//       message: "Error in GetDriver"+error,
//     });
//   }
// };
// export const getDriverByID = async (req: Request, res: Response) => {
//   try {
//     const response = await driverService.viewDriverById(req.params.id);
//     return res.status(200).json({
//       sucess: true,
//       data: response,
//     });
//   } catch (error) {
//     return res.json({
//       sucess: false,
//       message: "Error in GetDriver ID" + error,
//     });
//   }
// };
// export { signUp, verifyOtp, sendLoginOtp, login };