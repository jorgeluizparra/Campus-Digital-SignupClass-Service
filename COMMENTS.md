1. Decisão da arquitetura utilizada

Dividi o desafio em dois projetos separados, aplicação frontend e servico de signup. Isso permite que uma melhor compreenção do histórico de commites e gerenciamento de versões.

Backend:
O arquivo server.js é utilizado para configurar a aplicação backend, a pasta test guarda os arquivos de teste e a pasta app guarda os arquivos da aplicação. 
Eu utilizei a arquitetura MVC para o projeto. A pasta config guarda o arquivo de configuração do banco de dados, routes guarda o arquivo que define o input schema, o endereço da API e a função executada quando o end-point é requisitado, controllers guarda o arquivo com as funções utilizadas pela end-point e as funções axiliares utilizadas pelas funções, models guarda o arquivo que define o modelo signup e que interage com o banco de dados.


2. Lista de bibliotecas de terceiros utilizadas

Frontend:
- Vue
- Vuetify
- Vuex
- Vue Router
- Axios

Backend:
- Express
- Express-validator
- Sequelize
- Mysql2
- Cors
- Mocha
- Chai
- Chai Http
- Body-parser

3. O que você melhoraria se tivesse mais tempo

Eu teria escrito mais testes para as APIs, teria escrito testes para a aplicação frontend e trabalhado mais com as mensagens no frontend.

4. Quais requisitos obrigatórios que não foram entregues
Todos os requisitos foram entregues.