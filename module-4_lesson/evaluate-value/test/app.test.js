const request = require('supertest')
const app = require('../src/app')
const db = require('../src/db')

describe(('Integration test'), () => {
  beforeEach(async () => {
    await db.client.destroy({ where: {} })
    await db.amortization.destroy({ where: {} })
  })

  afterAll(async () => await db.sequelize.close())

  const clientJoe = {
    Nome: 'Joe',
    CPF: '000.000.000-00'
  }

  const resultadoEsperado = {
    montante: 106.9,
    juros: 0.025,
    parcelas: 3,
    primeiraPrestacao: 35.64,
    prestacoes: [35.64, 35.63, 35.63]
  }

  const payloadRequest = {
    Nome: clientJoe.Nome,
    CPF: clientJoe.CPF,
    Valor: 101.75,
    Parcelas: 3
  }

  test('should response http 200 on root path', () => {
    return request(app).get('/')
      .then(res => expect(res.status).toBe(200))
  })

  test('should response http 200 on root path', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
  })

  test('cenario 1', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res.body.erro).toBeUndefined()
    expect(res.body.montante).toBe(106.9)
    expect(res.status).toBe(201)
    expect(res.body).toMatchSnapshot(resultadoEsperado)
    expect(res.body).toMatchObject(resultadoEsperado)

    const client = await db.client.findOne({ where: { CPF: clientJoe.CPF } })
    expect(client.CPF).toBe(clientJoe.CPF)

    const consulta = await db.amortization.findOne({ where: { ClientCPF: clientJoe.CPF } })
    expect(consulta.Valor).toBe(101.75)
  })

  test('cenario 2', async () => {
    db.client.create(clientJoe)
    db.amortization.create({
      Valor: 1,
      NumPrestacoes: 2,
      Juros: 0.5,
      Prestacoes: '1, 1',
      ClientCPF: clientJoe.CPF,
      Montante: 2,
      createdAt: '2016-06-22 19:10:25-07'
    })

    const res = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res.body).toMatchSnapshot(resultadoEsperado)
    expect(res.status).toBe(201)

    const count = await db.amortization.count({ where: { ClientCPF: clientJoe.CPF } })
    expect(count).toBe(2)
  })

  test('cenario 3', async () => {
    const res1 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res1.body).toMatchSnapshot(resultadoEsperado)

    const res2 = await request(app)
      .post('/consulta-credito')
      .send(payloadRequest)

    expect(res2.body.erro).toBeDefined()
    expect(res2.status).toBe(405)
  })

  test('cenario 4', async () => {
    const res = await request(app)
      .post('/consulta-credito')
      .send({})

    expect(res.body.erro).toBeDefined()
    expect(res.status).toBe(400)
  })
})
