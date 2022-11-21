import { RequestHandler } from "express";
import { LoginDto } from "../../dtos/auth";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { redisClient } from "../..";

const brancaKey = process.env.BRANCA_KEY;
const branca = require("branca")(brancaKey);


const loginController: RequestHandler = async (req, res, next) => {
    
    const validation = LoginDto.validate(req.body);

    if (validation.error) {
      return res.status(400).json({
        message: "Validation Failed",
        errors: validation.error.details,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(403).json({
        message: "Invalid credentials"
      })
    }

    const matched = await bcrypt.compare(password, user.password);


    if (!matched) {
      return res.status(403).json({
        message: "Invalid credentials"
      });
    }

    const accessToken = jwt.sign({
      email: user.email,
    }, process.env.ACCESS_SECRET!,
    {
      expiresIn: '5m',
      subject: user._id.toString()      
    });


    const jsonPayload = JSON.stringify({
      email: user.email,
      id: user._id.toString()
    });

    const refreshToken = branca.encode(jsonPayload);

    redisClient.set(user._id.toString(), refreshToken);

    return res.json({
      message: "Login successful",
      data: {
        ...user.toJSON(),
        accessToken,
        refreshToken
      }
    })

}

export default loginController;