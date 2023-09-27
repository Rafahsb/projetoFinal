const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Define o período de tempo (15 minutos)
    max: 100, // Define o número máximo de solicitações permitidas no período
    message: "Você atingiu o limite de solicitações. Tente novamente mais tarde.",
});

const limiter2 = rateLimit({
    windowMs: 15 * 60 * 1000, // Define o período de tempo (15 minutos)
    max: 1, // Define o número máximo de solicitações permitidas no período
    message: "Você atingiu o limite de solicitações. Tente novamente mais tarde.",
});

module.exports = { rateLimitMiddleware: limiter, rateLimitMiddleware2: limiter2 };