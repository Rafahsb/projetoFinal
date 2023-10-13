# projetoFinal

1 - Git clone https://github.com/Rafahsb/projetoFinal.git

Requisitos: node e npm
Baixar o node -> https://nodejs.org/en/download

2 - Acesse a pasta api e rode o comando npm install

3 - Acesse a pasta web e rode o comando npm install

4 -  Apos terminar de baixar pacotes acesse a pasta api novamente e rode os seguintes comandos

Para criar o banco:
Para que funcione este comando o banco deverá estar com as mesmas configurações do arquivo "config.js" no caminho api/src/database/config/config.js. Ou altere para algum banco qualquer.
5 - npx sequelize db:create  

Para criar as tabelas do banco:
6 - npx sequelize db:migrate

Para popular o banco de dados rode o seguinte comando
7 - npm run populate

8 - Para que o sistema funcione com todas as funcionalidades deverá ser configurado todas as variáveis do arquivo .env-example. 

.env Api
TOKEN_SECRET=""  // configuração jwt
SALT=      // configuração jwt
USEREMAIL=""  // informar um e-mail que enviará o reset de senha. 
PASS=""     // senha do email para que a api possa enviar. No caso de um email google, deverá ser configurado o acesso de 2 fatores e criado uma senha de app segue o seguinte padrão nnnn nnnn nnnn nnnn 
TOKEN_RECAPTCHA="" // token gerado pela api de recaptcha do google  https://www.google.com/recaptcha/admin/site "chave secreta"

.env web
REACT_APP_GOOGLE_MAPS_API_KEY=""  https://console.cloud.google.com/apis/credentials/
REACT_APP_CAPTCHA_API_KEY="" // token gerado pela api de recaptcha do google "chave de site" https://www.google.com/recaptcha/admin/site


Agora abra dois terminais um na pasta /api e um na pasta /web e rode os comandos npm start
