import expressApp from "./express-app";
import { logger } from "./utils/logger/logger";

const PORT = process.env.PORT || 6000;

export const startServer = async ()=>{
    expressApp.listen(PORT, ()=>{
        logger.info(`App running on the ${PORT}`)
    })
    process.on("uncaughtException",(err)=>{
        logger.info(err);
        process.exit(1);
    })
}

startServer().then(()=>{
    logger.info("server is up!!")
})