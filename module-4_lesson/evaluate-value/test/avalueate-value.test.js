const evaluate = require('../src/evaluate-value')
const get = require('./asset')

describe('calcular montante', () => {
  test('Com uma prestação o montante é igual ao capital', () => {
    // operação
    const capital = get.randomInt(100, 200)
    const montante = evaluate.montante(capital, 0.0175, 1)

    // resultado
    expect(montante).toBe(capital)
  })

  test('Com 4 prestações o montante é crecido de juros', () => {
    const montante = evaluate.montante(500, 0.025, 4)

    expect(montante).toBe(538.45)
  })
})

describe('arredondar', () => {
  test('Arrendondar em duas casas decimais', () => {
    const result = evaluate.arredondar(538.4453124999998)

    expect(result).toBe(538.45)
  })

  test('1.005 deve retornar 1.01', () => {
    const result = evaluate.arredondar(1.001)

    expect(result).toBe(1.01)
  })
})
