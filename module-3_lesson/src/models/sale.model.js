import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Client from "./client.model.js";
import Product from "./product.model.js";

const Sale = db.define(
  "sales",
  {
    salesId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { underscored: true }
);

Sale.belongsTo(Product, { foreignKey: "productId" });
Sale.belongsTo(Client, { foreignKey: "clientId" });

export default Sale;
