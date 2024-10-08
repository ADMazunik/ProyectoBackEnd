import winston, { format } from "winston"

const ENV = process.argv[2] || "dev"


const logConfig = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    transports: [
        new winston.transports.Console({
            level: "info",
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        /* new winston.transports.File({
            filename: "./logs/logger.log",
            level: "error",
            format: format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.printf((data) => `${data.timestamp} | ${data.level} | ${data.message}`),
            )
        }) */
    ]
}

winston.addColors({ fatal: "red", error: "red", warning: "yellow", info: "green", http: "white", debug: "blue" })
export const logger = winston.createLogger(logConfig)