import Sequelize from "sequelize";
import db from "../repository/assets/db.js";
import Owner from "./owner.js";

const Animal = db.define(
  "animais",
  {
    animalId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);
Animal.belongsTo(Owner, { foreignKey: "proprietarioId" });

export default Animal;
