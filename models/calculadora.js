function somarrr(x, y) {
  if (!x | !y) {
    return "Erro faltou uma entrada";
  }

  if (isNaN(x) | isNaN(y)) {
    return "Erro digite apenas numeros";
  }
  return x + y;
}
exports.somar = somarrr;
