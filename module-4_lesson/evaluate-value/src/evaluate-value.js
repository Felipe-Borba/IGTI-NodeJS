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
  const fator = diferenca > 0 ? 1 : -1
  let i = diferenca > 0 ? 0 : resultado.length - 1

  while (diferenca !== 0) {
    resultado[i] = resultado[i] + (0.01 * fator)
    somaResultado = resultado.reduce((a, t) => a + t)
    diferenca = arredondar(montante - somaResultado)

    i += fator
  }

  return resultado
}

module.exports = {
  montante,
  arredondar,
  calcularPrestacoes
}
