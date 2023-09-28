class HttpHelper {
  constructor(response) {
    this.response = response;
  }

  created(data) {
    return this.response.status(201).json(data);
  }

  ok(data) {
    return this.response.status(200).json(data);
  }

  noContent(data) {
    return this.response.status(204).json(data);
  }

  badRequest(message) {
    return this.response.status(400).json({
      error: message,
    });
  }

  unauthorized() {
    return this.response.status(401).json({
      error: "Usuário não autorizado!",
    });
  }

  forbidden(error) {
    return this.response.status(403).json({
      error: {
        message: `Erro interno: ${error}`,
        variant: "danger",
      },
    });
  }

  notFound(message) {
    return this.response.status(404).json({
      error: message,
    });
  }

  internalError(error) {
    return this.response.status(500).json({
      error: {
        message: `Erro interno: ${error}`,
        variant: "danger",
      },
    });
  }
}

module.exports = { HttpHelper };
