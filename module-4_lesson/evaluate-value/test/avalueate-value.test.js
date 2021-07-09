const evaluate = require('../src/evaluate-value')
const get = require('./asset')
require('./extensoes')

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
    const result = evaluate.arredondar(1.005)

    expect(result).toBe(1.01)
  })
})

describe('calcularPrestacoes', () => {
  test('o numero de parelas é igual ao numero de prestações', () => {
    // Premissas
    const numeroPrestacoes = 6

    // Operação
    const prestacoes = evaluate.calcularPrestacoes(200, numeroPrestacoes)

    // Resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
  })

  test('Uma unica prestação, valor é igual ao montante', () => {
    const numeroPrestacoes = 1

    const prestacoes = evaluate.calcularPrestacoes(200, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(200)
  })

  test('Duas prestações, valor é igual a metade do montante', () => {
    const numeroPrestacoes = 2
    const montante = 200

    const prestacoes = evaluate.calcularPrestacoes(montante, numeroPrestacoes)

    expect(prestacoes.length).toBe(numeroPrestacoes)
    expect(prestacoes[0]).toBe(montante / 2)
    expect(prestacoes[1]).toBe(montante / 2)
  })

  test('Valor da soma das prestações deve ser igual ao montente com duas casas decimais', () => {
    // Dado (Given)
    const numeroPrestacoes = 3
    const montante = 100

    // Quando (when)
    const prestacoes = evaluate.calcularPrestacoes(montante, numeroPrestacoes)

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    // const soma = evaluate.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
    // expect(soma).toBe(evaluate.arredondar(montante))
    expect(prestacoes).terSomaDeValoresIgual(montante)

    // for (let i = 0; i < prestacoes.length - 1; i++) {
    //   const j = i + 1

    //   expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    // }
    expect(prestacoes).sejaDecrescente()
  })

  test('Valor da soma das prestações deve ser igual ao montente com duas casas decimais (montante diferente)', () => {
    // Dado (Given)
    const numeroPrestacoes = 3
    const montante = 101.994

    // Quando (when)
    const prestacoes = evaluate.calcularPrestacoes(montante, numeroPrestacoes)

    // Então (then)
    expect(prestacoes.length).toBe(numeroPrestacoes)
    // const soma = evaluate.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
    // expect(soma).toBe(evaluate.arredondar(montante))
    expect(prestacoes).terSomaDeValoresIgual(montante)

    // for (let i = 0; i < prestacoes.length - 1; i++) {
    //   const j = i + 1

    //   expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    // }
    expect(prestacoes).sejaDecrescente()

    // test
    const array = [1, 2, 3, 4]
    expect(array).not.sejaDecrescente()
  })
})
