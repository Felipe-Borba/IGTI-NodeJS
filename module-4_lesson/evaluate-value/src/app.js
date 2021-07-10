const express = require('express')
const { check, validationResult } = require('express-validator')
const consultaCliente = require('./search-client')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
  res.send('hello world')
})

app.post('/consulta-credito',
  check('Nome', 'Nome deve ser informado').notEmpty(),
  check('CPF', 'CPF deve ser informado').notEmpty(),
  check('Valor', 'Valor deve ser um numero').notEmpty().isFloat(),
  check('Parcelas', 'Parcelas deve ser um inteiro').notEmpty().isInt(),
  async (req, res) => {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() })
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.Nome,
        req.body.CPF,
        req.body.Valor,
        req.body.Parcelas
      )
      res.status(201).json(valores)
    } catch (error) {
      return res.status(405).json({ erro: error.message })
    }
  }
)

module.exports = app
