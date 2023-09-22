const Dotenv = require("dotenv-webpack");

module.exports = {
    // ... outras configurações do webpack ...
    plugins: [new Dotenv()],
};
