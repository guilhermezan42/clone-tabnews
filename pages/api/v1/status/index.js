function status(request, response) {
  response
    .status(200)
    .json({ chave: "Te amo pai e obrigado Deus por estar sempre comigo" });
}
export default status;
