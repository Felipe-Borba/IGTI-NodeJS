import Sequelize from "sequelize";
import db from "../repositories/db";
import Supplier from "./supplier.model.js";

const Product = db.define(
  "products",
  {
    productId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { underscore: true }
);

Product.belongsTo(Supplier, { foreignKey: "supplierId" });

export default Product;
