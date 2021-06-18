import express from "express";
import winston from "winston";
import accountsRouter from "./routes/account.routes.js";
import userRouter from "./routes/user.routes.js";
import { promises as fs } from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc.js";
import basicAuth from "express-basic-auth";
import jwt from "jsonwebtoken";

const { readFile, writeFile } = fs;

global.fileName = "module-2_assignment/my-bank-api/accounts.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "module-2_assignment/my-bank-api/my-bank-api.log",
    }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return async (req, res, next) => {
    const authHeader = req.headers[`authorization`];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send("Invalid Bearer token");
    }

    const token = authHeader.substring(7, authHeader.length);
    const publickey = await readFile(
      "./module-2_assignment/my-bank-api/security/public.key",
      "utf-8"
    );

    jwt.verify(token, publickey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid JWT token");
      }

      if (isAllowed(decoded.role)) {
        next();
      } else {
        res.status(401).send("Role not allowed");
      }
    });
  };
}

app.use("/account", authorize("admin", "role1"), accountsRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

app.listen(8080, async () => {
  try {
    await readFile(global.fileName);
    logger.info("API Started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info("API Started and File Created!");
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
