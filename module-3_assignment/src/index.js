import express from "express";
import cors from "cors";
import winston, { silly } from "winston";

import clientRouter from "./routes/client.route.js";
import productRouter from "./routes/products.route.js";
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
      filename: "module-3_assignment/store-api.log",
    }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});

const app = express();

app.use(express.jason());
app.use(cors());
app.use("/client", clientRouter);
app.use("/product", productRouter);
app.use("/sale", saleRouter);
app.use("/supplier", supplierRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`api started on http://localhost:${PORT}`);
});
