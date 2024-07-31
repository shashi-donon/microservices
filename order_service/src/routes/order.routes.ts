import express, {NextFunction, Request, Response} from 'express';

const orderRouter = express.Router()

orderRouter.post("/order", (_req: Request, res: Response, _next: NextFunction)=>{
    return res.status(200).json({message: "create Order"})
})

orderRouter.get("/order", (_req: Request, res: Response, _next: NextFunction)=>{
    return res.status(200).json({message: "get the Orders"})
})

orderRouter.get("/order/:id", (_req: Request, res: Response, _next: NextFunction)=>{
    return res.status(200).json({message: "get the Order"})
})

orderRouter.delete("/order/:id", (_req: Request, res: Response, _next: NextFunction)=>{
    return res.status(200).json({message: "delete the Order"})
})


export default orderRouter;