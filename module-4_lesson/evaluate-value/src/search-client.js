const calculaValor = require('./evaluate-value')
const db = require('./db')

const interest = 0.025

const consultar = async (nome, CPF, valor, parcelas) => {
  let client = await db.client.findOne({
    where: { CPF }
  })

  if (client == null) {
    client = await db.client.create({
      Nome: nome,
      CPF: CPF
    })
  }

  const ultimaConsulta = await db.amortization.findOne({
    where: { ClientCPF: CPF },
    order: [
      [db.sequelize.col('createdAt'), 'DESC']
    ]
  })

  if (ultimaConsulta) {
    const diferenca = Math.abs(ultimaConsulta.createdAt.getTime() - new Date().getTime()) // dá para tirar esse math.abs só inverter a subtração
    const diferencaDias = Math.round(diferenca / (1000 * 60 * 60 * 24)) // avoid magic numbers (MILLISECONDS_PER_DAY)

    if (diferencaDias <= 30) {
      throw new Error(`Ultima consulta realizada há ${diferencaDias} dias`)
    }
  }

  const montante = calculaValor.montante(valor, interest, parcelas)
  const prestacoes = calculaValor.calcularPrestacoes(montante, parcelas)

  const novaConsulta = {
    Valor: valor,
    NumPrestacoes: parcelas,
    Juros: interest,
    Prestacoes: prestacoes.join(', '),
    ClientCPF: client.CPF,
    Montante: montante
  }

  await db.amortization.create(novaConsulta)

  return {
    montante: montante,
    juros: interest,
    parcelas: prestacoes.length,
    primeiraPrestacao: prestacoes[0],
    prestacoes: prestacoes
  }
}

module.exports = {
  consultar
}
