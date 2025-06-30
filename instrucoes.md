## Ambiente necessário para rodar o projeto

* Node instalado
* NPM intalado

## Instruções para rodar o projeto

1º - Conectar a um banco postgres ( Trocar no .ENV as informações do banco de dados )

2º - npm i

3º - npm run start:dev


## Instruções para produção

1º - npm run build # ou yarn build

    No seu servidor de produção ou conteiner Docker:
    Instala apenas as dependências de produção
2º - npm install --production

3º - npm run start:prod

## Instruções de criação do projeto
1º - npm i -g @nestjs/cli

2º - nest new radiate-clean-backend

3º - cd radiate-clean-backend

4º - npm run start:dev

### ORM e banco de dados (usando PostgreSQL)
npm install @nestjs/typeorm typeorm pg

### Para as configurações gerais do projeto e segurança
npm install dotenv

### Validação
npm install class-validator class-transformer

### Autenticação (futura etapa)
npm install @nestjs/jwt passport-jwt bcrypt @nestjs/passport passport
