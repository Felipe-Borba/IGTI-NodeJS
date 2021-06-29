import express from "express";
import cors from "cors";
import winston from "winston";
import env from "dotenv";

import AnimalRouter from "./router/animal.js";
import OwnerRouter from "./router/owner.js";
import ServiceRouter from "./router/service.js";
import HomeRouter from "./router/home.js";

env.config();

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message};`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "PetShop-api.log",
    }),
  ],
  format: combine(label({ label: "PetShop-api" }), timestamp(), myFormat),
});

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", HomeRouter);
app.use("/proprietario", OwnerRouter);
app.use("/animal", AnimalRouter);
app.use("/service", ServiceRouter);

app.use((err, req, res, _) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`api started on http://localhost:${PORT}`);
});
