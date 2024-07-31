import express, {NextFunction, Request, Response} from "express";
import cors from 'cors';
import orderRoutes from './routes/order.routes';
import cartRoutes from './routes/cart.routes'
import { HandleErrorWithLogger } from "./utils/error/handler";

//creating an express app
const app = express();

//setting up cors
app.use(cors());
app.use(express.json())

app.use(cartRoutes)
app.use(orderRoutes)

app.use(HandleErrorWithLogger)

app.get('/',(_req: Request, res: Response, _next: NextFunction)=>{
    return res.status(200).json({message: "product app healthy"})
})

export default app;
