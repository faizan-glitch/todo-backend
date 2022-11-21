import express from "express";
import AuthRouter from "./routes/auth";

export const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);

