import expressApp from "./expressApp";
import { logger } from "./utils/logger/logger";

const PORT = process.env.PORT || 5000;

export const startServer = async ()=>{
    expressApp.listen(PORT, ()=>{
        logger.info(`App running on the ${PORT}`)
    })
    process.on("uncaughtException",(err)=>{
        logger.error(err);
        process.exit(1);
    })
}

startServer().then(()=>{
    logger.info("server is up!!")
})