import winston, { format,transports } from 'winston';
const { combine, timestamp, colorize, align,printf } = format;

export const logger = winston.createLogger({
    level: "debug",
    format: combine(
    colorize({ all: true }),
        timestamp({
          format: 'MM-DD hh:mm:ss A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    transports: [new transports.Console()]
})

