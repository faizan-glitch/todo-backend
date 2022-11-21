
import Joi from "joi";


export const LoginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required() // .regex()
});

export const SignupDto = Joi.object({
  firstName: Joi.string().required().max(16),
  lastName: Joi.string().required().max(16),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const ForgotDto = Joi.object({
  email: Joi.string().email().required(),
});

export const ResetDto = Joi.object({
  password: Joi.string().min(8).required(),
  resetToken: Joi.string().required(),
});

export const UpdateProfileDto = Joi.object({
  firstName: Joi.string().min(3).max(16).optional(),
  lastName: Joi.string().min(1).max(16).optional(),
});