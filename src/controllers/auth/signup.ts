import { RequestHandler } from "express";
import { SignupDto } from "../../dtos/auth";
import User from "../../models/user";
import bcrypt from 'bcrypt'

const signupController: RequestHandler = async (req, res, next) => {
    
    const validation = SignupDto.validate(req.body);

    if (validation.error) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: validation.error.details,
      });
    }

    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);


    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    return res.status(201).json({
      message: "Signup successful"
    })
}

export default signupController;