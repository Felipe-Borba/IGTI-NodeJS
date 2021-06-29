import Sequelize from "sequelize";
import env from "dotenv";

env.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export default sequelize;
