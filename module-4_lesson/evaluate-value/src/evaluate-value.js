function montante (capital, taxa, periodo) {
  const montante = capital * Math.pow(1 + taxa, periodo - 1)

  return arredondar(montante)
}

function arredondar (number) {
  const accurate = 100
  const arredondando = Math.round((number + Number.EPSILON) * accurate) / accurate
  return arredondando
}

module.exports = {
  montante,
  arredondar
}
