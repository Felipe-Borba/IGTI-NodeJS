function montante (capital, taxa, periodo) {
  const montante = capital * Math.pow(1 + taxa, periodo - 1)

  return arredondar(montante)
}

function arredondar (number) {
  const accurate = 100
  const arredondando = Math.round((number + Number.EPSILON) * accurate) / accurate
  return arredondando
}

function calcularPrestacoes (montante, numeroParcelas) {
  const prestacaobase = arredondar(montante / numeroParcelas)
  const resultado = Array(numeroParcelas).fill(prestacaobase)

  let somaResultado = resultado.reduce((a, t) => a + t)
  let diferenca = arredondar(montante - somaResultado)
  let i = 0

  while (diferenca !== 0) {
    resultado[i] = resultado[i] + 0.01
    somaResultado = resultado.reduce((a, t) => a + t)
    diferenca = arredondar(montante - somaResultado)

    i++
  }

  return resultado
}

module.exports = {
  montante,
  arredondar,
  calcularPrestacoes
}
