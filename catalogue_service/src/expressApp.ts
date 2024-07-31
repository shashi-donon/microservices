import express from "express";
import catalogueRouter from "./api/catalogue.routes";
import { HandleErrorWithLogger } from "./utils/error/handler";

//creating an express app
const app = express();
app.use(express.json())

//catalogue Router
app.use("/", catalogueRouter)

app.use(HandleErrorWithLogger)

export default app;
