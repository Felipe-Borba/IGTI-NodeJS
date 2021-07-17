import Sequelize from "sequelize";
import db from "../repository/assets/db.js";
import Animal from "./animal.js";

const Service = db.define(
  "servicos",
  {
    servicoId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    descricao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);
Service.belongsTo(Animal, { foreignKey: "animalId" });

export default Service;
