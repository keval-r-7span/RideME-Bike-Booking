const mongoose = require("mongoose");
const Joi = require("joi");

const CustomerSchema = new mongoose.Schema(
  {
    name:{
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
    },
    // location
    //
    role: {
      type: String,
      enum: ["admin", "driver", "user"],
      default: "user",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

// joi Schema validation
const customerJoiSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().min(10).max(10).required(),
  password: Joi.string().min(4).max(12).required(),
});

module.exports = {
    Customer,validateCustomer:(user)=>customerJoiSchema.validate(user)
};
