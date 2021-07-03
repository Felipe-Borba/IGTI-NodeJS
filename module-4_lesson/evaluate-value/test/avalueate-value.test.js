const evaluate = require("../src/evaluate-value");
const get = require("./asset");

test("Com uma prestação o montante é igual ao capital", () => {
  // operação
  const capital = get.randomInt(100, 200);
  const montante = evaluate.montante(capital, 0.0175, 1);

  //resultado
  expect(montante).toBe(capital);
});
