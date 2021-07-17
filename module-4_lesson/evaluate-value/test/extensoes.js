const calculaValor = require('../src/evaluate-value')

expect.extend({
  terSomaDeValoresIgual (itens, soma) {
    const somaReal = calculaValor.arredondar(itens.reduce((a, t) => a + t))
    const passou = somaReal === calculaValor.arredondar(soma)

    return {
      message: () => `A soma ${somaReal} deve ser igual a ${soma}`,
      pass: passou
    }
  },

  sejaDecrescente (itens) {
    for (let i = 0; i < itens.length - 1; i++) {
      const j = i + 1

      // expect(itens[i]).toBeGreaterThanOrEqual(itens[j])
      if (itens[i] < itens[j]) {
        return {
          message: () => 'O array derver estar em ordem descrecente!',
          pass: false
        }
      }
    }

    return {
      message: () => 'O array derver estar em ordem descrecente',
      pass: true
    }
  }
})
