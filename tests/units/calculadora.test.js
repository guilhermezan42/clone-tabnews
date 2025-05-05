const calculadora = require("../../models/calculadora.js");
test("1 + 2 deve ser 3", () => {
  expect(calculadora.somar(1, 2)).toBe(3);
});

test("1 + banana deve ser erro", () => {
  expect(calculadora.somar(1, "banana")).toBe("Erro digite apenas numeros");
});

test("banana + 1 deve ser erro", () => {
  expect(calculadora.somar("banana", 1)).toBe("Erro digite apenas numeros");
});
test("1 + nada deve ser erro", () => {
  expect(calculadora.somar(1)).toBe("Erro faltou uma entrada");
});
