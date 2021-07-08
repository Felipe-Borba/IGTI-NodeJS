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

  return resultado
}

module.exports = {
  montante,
  arredondar,
  calcularPrestacoes
}
