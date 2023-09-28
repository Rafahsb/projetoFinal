const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Define o período de tempo (15 minutos)
  max: 1000, // Define o número máximo de solicitações permitidas no período
  message:
    "Você atingiu o limite de solicitações. Tente novamente mais tarde. 15 minutos",
});

const limiter2 = rateLimit({
  windowMs: 15 * 60 * 1000, // Define o período de tempo (15 minutos)
  max: 3, // Define o número máximo de solicitações permitidas no período
  message:
    "Você atingiu o limite de solicitações. Tente novamente mais tarde. 15 minutos",
});

module.exports = {
  rateLimitMiddleware: limiter,
  rateLimitMiddleware2: limiter2,
};
