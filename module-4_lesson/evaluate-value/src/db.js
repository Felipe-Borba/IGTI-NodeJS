const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 49153,
  database: 'consulta_credito',
  username: 'postgres',
  password: 'mysecretpassword',
  logging: false
})

const clientModel = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  })

  return Client
}

const amortizationModel = (sequelize, DataTypes) => {
  const Amortization = sequelize.define('Amortization', {
    Valor: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    NumPrestacoes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Juros: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Montante: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Prestacoes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return Amortization
}

const client = clientModel(sequelize, Sequelize.DataTypes)
const amortization = amortizationModel(sequelize, Sequelize.DataTypes)

client.hasMany(amortization, { as: 'Amortizations' })
amortization.belongsTo(client)

module.exports = {
  client,
  amortization,
  sequelize
}
