const express = require('express')
const app = express()
const db = require('./db')

const { check, validationResult } = require('express-validator')

const consultaCliente = require('./consulta-cliente')

app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send('Bootcamp desenvolvedor back end - Tópicos especiais!')
})

app.get('/client', async (req, res) => {
  try {
    const response = await db.cliente.findAll()

    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({ erro: 'Something gone wrong' })
  }
})

app.post('/consulta-credito',

  check('nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('valor', 'O valor deve ser um número').notEmpty().isFloat(),
  check('parcelas', 'O número de parcelas deve ser um número inteiro').notEmpty().isInt(),

  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() })
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas
      )
      res.status(201).json(valores)
    } catch (erro) {
      return res.status(405).json({ erro: erro.message })
    }
  }
)

module.exports = app
