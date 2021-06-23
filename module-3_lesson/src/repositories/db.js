import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.URL, {
  dialect: "postgres",
  define: {
    timestamp: false,
  },
});

export default sequelize;
