import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import mongoose from "mongoose";
import ioredis from 'ioredis';

export const redisClient = new ioredis({
    password: process.env.REDIS_PASSWORD
});

mongoose.connect(process.env.MONGO_URI!)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`);
    });
})
.catch(err => {
    console.log("Mongoose Error", err);
})