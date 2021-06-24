import express from "express";
import cors from "cors";
import winston from "winston";

import clientRouter from "./routes/client.route.js";
import productRouter from "./routes/product.route.js";
import saleRouter from "./routes/sale.route.js";
import supplierRouter from "./routes/supplier.route.js";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message};`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "store-api.log",
    }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});

const app = express();

app.use(express.json());
app.use(cors());
app.use("/client", clientRouter);
app.use("/product", productRouter);
app.use("/sale", saleRouter);
app.use("/supplier", supplierRouter);

app.use((err, req, res, _) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`api started on http://localhost:${PORT}`);
});
